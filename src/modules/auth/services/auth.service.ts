import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AdminMapper } from '../../admin/services/admin.mapper';
import { AdminRepository } from '../../repository/services/admin.repository';
import { BuyersRepository } from '../../repository/services/buyers.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { UsersRepository } from '../../repository/services/users.repository';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { SignUpSellerReqDto } from '../models/dto/req/sign-up-seller.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { ITokenPair } from '../models/interfaces/token-pair.interface';
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
  ) {}

  public async signUpAdmin(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.adminRepository.save(
      this.adminRepository.create({ ...dto, password: passwordHash }),
    );

    await this.usersRepository.save(
      this.usersRepository.create({
        email: dto.email,
        password: passwordHash,
        user_id: user.id,
      }),
    );
    const tokens = await this.GenerateAndSaveTokens(
      user.id,
      user.role,
      dto.deviceId,
    );
    return { user: AdminMapper.toResDto(user), tokens };
  }

  public async signUpSeller(dto: SignUpSellerReqDto): Promise<any> {
    await this.isEmailNotExistOrThrow(dto.email);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.sellersRepository.save(
      this.sellersRepository.create({
        ...dto,
        role_name: dto.role_name,
        password: passwordHash,
      }),
    );

    const tokens = await this.GenerateAndSaveTokens(
      user.id,
      user.role_id,
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

    const tokens = await this.GenerateAndSaveTokens(
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

  // private getRepository(role: string): Repository<any> {
  //   switch (role) {
  //     case 'admin':
  //       return this.adminRepository;
  //     case 'manager':
  //       return this.managersRepository;
  //     case 'seller':
  //       return this.sellersRepository;
  //     case 'buyer':
  //       return this.buyersRepository;
  //   }
  // }

  private async GenerateAndSaveTokens(
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

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email });
    // let user;
    //
    // switch (role) {
    //   case 'admin':
    //     user = await this.adminRepository.findOneBy({ email });
    //     break;
    //   case 'seller':
    //     user = await this.sellersRepository.findOneBy({ email });
    //     break;
    //   case 'buyer':
    //     user = await this.buyersRepository.findOneBy({ email });
    //     break;
    //   default:
    //     break;
    // }
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
