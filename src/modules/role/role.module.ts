import { Module } from '@nestjs/common';

import { PermissionController } from './permission.controller';
import { RoleController } from './role.controller';
import { PermissionService } from './service/permission.service';
import { RoleService } from './service/role.service';

@Module({
  imports: [],
  controllers: [RoleController, PermissionController],
  providers: [RoleService, PermissionService],
  exports: [RoleService],
})
export class RoleModule {}
