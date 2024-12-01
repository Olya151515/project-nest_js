import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RoleGuard } from '../../common/guard/role-guard';
import { PermissionController } from './permission.controller';
import { RoleController } from './role.controller';
import { PermissionService } from './service/permission.service';
import { RoleService } from './service/role.service';

@Module({
  imports: [],
  controllers: [RoleController, PermissionController],
  providers: [
    RoleService,
    PermissionService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [RoleService],
})
export class RoleModule {}
