import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';

import { ManagerEntity } from '../../../database/entities/manager.entity';
import { AdminRepository } from '../../repository/services/admin.repository';
import { BuyersRepository } from '../../repository/services/buyers.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import {
  SignUpSeller,
  SignUpSellerReqDto,
} from '../models/dto/req/sign-up-seller.req.dto';
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

  public async signUpAdmin(dto: SignUpReqDto): Promise<any> {
    await this.isEmailNotExistOrThrow(dto.email);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.adminRepository.save(
      this.adminRepository.create({ ...dto, password: passwordHash }),
    );
  }

  public async signUpSeller(dto: SignUpSellerReqDto) {
    await this.isEmailNotExistOrThrow(dto.email);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.sellersRepository.save(
      this.sellersRepository.create({ ...dto, password: passwordHash }),
    );
  }

  private async isEmailNotExistOrThrow(email: string) {
    const user = Promise.all([
      await this.adminRepository.findOneBy({ email }),
      await this.buyersRepository.findOneBy({ email }),
      await this.sellersRepository.findOneBy({ email }),
      await this.managersRepository.findOneBy({ email }),
    ]);
    if (user) {
      throw new Error('Email already exists');
    }
  }
}
