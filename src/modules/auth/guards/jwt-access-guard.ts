import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Admin } from 'typeorm';

import { RoleEnum } from '../../../database/entities/enums/role-enum';
import { AdminMapper } from '../../admin/services/admin.mapper';
import { AdminRepository } from '../../repository/services/admin.repository';
import { BuyersRepository } from '../../repository/services/buyers.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { SKIP_AUTH } from '../decorators/skip-auth-decorator';
import { TokenType } from '../models/enums/token-type-enum';
import { AuthCacheService } from '../services/auth-cache-service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly adminRepository: AdminRepository,
    private readonly sellerRepository: SellersRepository,
    private readonly buyerRepository: BuyersRepository,
    private readonly managerRepository: ManagersRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;
    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.user_Id,
      payload.deviceId,
      accessToken,
    );
    if (!isAccessTokenExist) {
      throw new UnauthorizedException();
    }

    if (payload.role === 'admin') {
      request.res.locals.user = AdminMapper.toIAdminData(
        await this.adminRepository.findOneBy({ id: payload.user_Id }),
        payload,
      );
      return true;
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
      case RoleEnum.SELLER:
        return this.sellerRepository;
      case RoleEnum.MANAGER:
        return this.managerRepository;
      case RoleEnum.BUYER:
        return this.buyerRepository;
    }
  }
}
