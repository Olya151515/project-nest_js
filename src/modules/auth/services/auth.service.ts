import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AccountEnum } from '../../../database/entities/enums/account-enum';
import { EntitiesALl } from '../../../database/entities/enums/entities.enum';
import { RoleEntity } from '../../../database/entities/role.entity';
import { AdminMapper } from '../../admin/services/admin.mapper';
import { AdminRepository } from '../../repository/services/admin.repository';
import { BuyersRepository } from '../../repository/services/buyers.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { RoleRepository } from '../../repository/services/role.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { UsersRepository } from '../../repository/services/users.repository';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { SignUpBuyerReqDto } from '../models/dto/req/sign-up-buyer.req.dto';
import { SignUpSellerReqDto } from '../models/dto/req/sign-up-seller.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { ITokenPair } from '../models/interfaces/token-pair.interface';
import { IUserData } from '../models/interfaces/user-data';
import { AuthCacheService } from './auth-cache-service';
import { BaseUserMapper } from './baseUser.mapper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly sellersRepository: SellersRepository,
    private readonly buyersRepository: BuyersRepository,
    private readonly managersRepository: ManagersRepository,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly usersRepository: UsersRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  public async signUpAdmin(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.adminRepository.save(
      this.adminRepository.create({ ...dto, password: passwordHash }),
    );
    const role = await this.roleRepository.initializeAdminRole(user);

    await this.saveUser({ entity: user }, passwordHash, role);
    const tokens = await this.generateAndSaveTokens(
      user.id,
      user.role,
      dto.deviceId,
    );
    return { user: AdminMapper.toBaseResDto(user), tokens };
  }

  public async signUpSeller(dto: SignUpSellerReqDto): Promise<AuthResDto> {
    const now = new Date();
    await this.isEmailNotExistOrThrow(dto.email);
    const role = await this.checkRoleExist(dto.role, dto.role_scope);
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.sellersRepository.save(
      this.sellersRepository.create({
        ...dto,
        role: dto.role,
        password: passwordHash,
        premiumExpiry:
          dto.accountType === AccountEnum.PREMIUM
            ? new Date(now.setMonth(now.getMonth() + 1))
            : null,
      }),
    );

    await this.saveUser({ entity: user }, passwordHash, role);
    const tokens = await this.generateAndSaveTokens(
      user.id,
      user.role,
      dto.deviceId,
    );

    return { user: BaseUserMapper.toResDto(user), tokens };
  }
  public async signUpBuyer(dto: SignUpBuyerReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);

    const role = await this.checkRoleExist(dto.role, dto.role_scope);
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.buyersRepository.save(
      this.sellersRepository.create({
        ...dto,
        role: dto.role,
        password: passwordHash,
      }),
    );

    await this.saveUser({ entity: user }, passwordHash, role);

    const tokens = await this.generateAndSaveTokens(
      user.id,
      user.role,
      dto.deviceId,
    );

    return { user: BaseUserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password', 'user_id'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateAndSaveTokens(
      user.user_id,
      dto.role,
      dto.deviceId,
    );

    let userEntity;
    switch (dto.role) {
      case 'admin':
        userEntity = await this.adminRepository.findOneBy({ id: user.user_id });
        break;
      case 'manager':
        userEntity = await this.managersRepository.findOneBy({
          id: user.user_id,
        });
        break;
      case 'seller':
        userEntity = await this.sellersRepository.findOneBy({
          id: user.user_id,
        });
        break;
      case 'buyer':
        userEntity = await this.buyersRepository.findOneBy({
          id: user.user_id,
        });
        break;
    }

    return { user: BaseUserMapper.toResDto(userEntity), tokens };
  }

  public async signOut(userData: IUserData): Promise<void> {
    await Promise.all([
      await this.authCacheService.deleteToken(
        userData.user_id,
        userData.deviceId,
      ),
      await this.refreshTokenRepository.delete({
        user_id: userData.user_id,
        deviceId: userData.deviceId,
      }),
    ]);
  }

  public async refresh(userData: IUserData): Promise<ITokenPair> {
    await this.signOut(userData);

    return await this.generateAndSaveTokens(
      userData.user_id,
      userData.role_name,
      userData.deviceId,
    );
  }

  public async saveUser(
    user: EntitiesALl,
    password: string,
    role: RoleEntity,
  ): Promise<void> {
    await this.usersRepository.save(
      this.usersRepository.create({
        email: user.entity.email,
        password: password,
        user_id: user.entity.id,
        role_id: role.id,
      }),
    );
  }
  public async checkRoleExist(
    roleName: string,
    role_scape: string,
  ): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({
      where: { name: roleName, scope: role_scape },
    });
    if (!role) {
      throw new ConflictException('Role not found');
    }
    return role;
  }
  public async generateAndSaveTokens(
    userId: string,
    userRole: string,
    deviceId: string,
  ): Promise<ITokenPair> {
    const tokens = await this.tokenService.generateAuthTokens({
      user_Id: userId,
      role: userRole,
      deviceId: deviceId,
    });

    await this.authCacheService.saveToken(tokens.accessToken, userId, deviceId);

    await this.refreshTokenRepository.save(
      this.refreshTokenRepository.create({
        user_id: userId,
        deviceId: deviceId,
        refreshToken: tokens.refreshToken,
        userRole: userRole,
      }),
    );
    return tokens;
  }

  public async isEmailNotExistOrThrow(email: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
