import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RoleEnum } from '../../../database/entities/enums/role-enum';
import { AdminMapper } from '../../admin/services/admin.mapper';
import { AdminRepository } from '../../repository/services/admin.repository';
import { BuyersRepository } from '../../repository/services/buyers.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { UsersRepository } from '../../repository/services/users.repository';
import { TokenType } from '../models/enums/token-type-enum';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UsersRepository,
    private readonly sellerRepository: SellersRepository,
    private readonly managerRepository: ManagersRepository,
    private readonly adminRepository: AdminRepository,
    private readonly buyerRepository: BuyersRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    const isRefreshTokenExist =
      await this.refreshTokenRepository.isRefreshTokenExist(refreshToken);
    if (!isRefreshTokenExist) {
      throw new UnauthorizedException();
    }
    const user = await this.getRepository(payload.role).findOneBy({
      id: payload.user_Id,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    request.res.locals.user = AdminMapper.toIUserData(
      { entity: user },
      payload,
    );
    return true;
  }

  getRepository(role: string) {
    switch (role) {
      case RoleEnum.ADMIN:
        return this.adminRepository;
      case RoleEnum.SELLER:
        return this.sellerRepository;
      case RoleEnum.MANAGER:
        return this.managerRepository;
      case RoleEnum.BUYER:
        return this.buyerRepository;
    }
  }
}
