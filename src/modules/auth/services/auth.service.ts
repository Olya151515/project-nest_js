import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AdminMapper } from '../../admin/services/admin.mapper';
import { AdminRepository } from '../../repository/services/admin.repository';
import { BuyersRepository } from '../../repository/services/buyers.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { SignUpSellerReqDto } from '../models/dto/req/sign-up-seller.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { AuthCacheService } from './auth-cache-service';
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
  ) {}

  public async signUpAdmin(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email, dto.role);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.adminRepository.save(
      this.adminRepository.create({ ...dto, password: passwordHash }),
    );
    const tokens = await this.tokenService.generateAuthTokens({
      user_Id: user.id,
      role: user.role,
    });

    await this.authCacheService.saveToken(
      tokens.accessToken,
      user.id,
      dto.deviceId,
    );
    await this.refreshTokenRepository.save(
      this.refreshTokenRepository.create({
        user_id: user.id,
        deviceId: dto.deviceId,
        refreshToken: tokens.refreshToken,
        userRole: user.role,
      }),
    );
    return { user: AdminMapper.toResDto(user), tokens };
  }

  public async signUpSeller(dto: SignUpSellerReqDto): Promise<any> {
    await this.isEmailNotExistOrThrow(dto.email, dto.role);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    // const user = await this.sellersRepository.save(
    //   this.sellersRepository.create({ ...dto, password: passwordHash }),
    // );

    // const user = await this.sellersRepository.save(
    //   this.sellersRepository.create({ ...dto, password: passwordHash }),
    // );
    //return { user: AdminMapper.toResDto(user), tokens };
  }

  // public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
  //   const user = await this.userRepository.findOne({
  //     where: { email: dto.email },
  //     select: ['id', 'password'],
  //   });
  // }

  private async isEmailNotExistOrThrow(email: string, role: string) {
    let user;

    switch (role) {
      case 'admin':
        user = await this.adminRepository.findOneBy({ email });
        break;
      case 'seller':
        user = await this.sellersRepository.findOneBy({ email });
        break;
      case 'buyer':
        user = await this.buyersRepository.findOneBy({ email });
        break;
      default:
        break;
    }
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
