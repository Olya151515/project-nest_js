import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RoleEnum } from '../../database/entities/enums/role-enum';
import { IUserData } from '../../modules/auth/models/interfaces/user-data';
import { ROLES_KEY } from '../decorators/role-decorator';
import { SKIP_ROLE } from '../decorators/skip-role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user: IUserData = request.res.locals.user;

    const isRoles = requiredRoles.some((role) => user?.role_name === role);
    if (!isRoles) {
      throw new ForbiddenException('You do not have role for this');
    }
    return requiredRoles.some((role) => user?.role_name === role);
  }
}
