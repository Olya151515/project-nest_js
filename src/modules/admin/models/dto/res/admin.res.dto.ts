import { PickType } from '@nestjs/swagger';

import { ShortManagerResDto } from '../../../../manager/models/dto/res/manager/short-manager.res.dto';
import { ShortPermissionResDto } from '../../../../role/models/dto/res/permissions/short-permission.res.dto';
import { ShortRoleResDto } from '../../../../role/models/dto/res/role/short-role.res.dto';
import { BaseAdminResDto } from './base-admin.res.dto';

export class AdminResDto extends PickType(BaseAdminResDto, [
  'id',
  'role',
  'name',
  'email',
  'phone',
  'role_scope',
]) {
  createdRoles: ShortRoleResDto[];
  createdPermissions: ShortPermissionResDto[];
  createdManagers: ShortManagerResDto[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
