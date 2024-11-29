import { PermissionEntity } from '../../../database/entities/permissions.entity';
import { RoleEntity } from '../../../database/entities/role.entity';
import { AdminMapper } from '../../admin/services/admin.mapper';
import { ShortPermissionResDto } from '../models/dto/res/permissions/short-permission.res.dto';
import { RoleResDto } from '../models/dto/res/role/role.res.dto';
import { ShortRoleResDto } from '../models/dto/res/role/short-role.res.dto';

export class RoleMapper {
  public static toResDto(role: RoleEntity): RoleResDto {
    return {
      id: role.id,
      name: role.name,
      scope: role.scope,
      permissions: role.permissions
        ? role.permissions.map((permission) => permission)
        : [],
      createdBy: role.createdBy
        ? AdminMapper.toBaseResDto(role.createdBy)
        : null,
    };
  }
  public static toShortRoleResDto(role: RoleEntity): ShortRoleResDto {
    return {
      id: role.id,
      name: role.name,
      scope: role.scope,
    };
  }
  public static toPermissionResDto(
    perm: PermissionEntity,
  ): ShortPermissionResDto {
    return {
      id: perm.id,
      action: perm.action,
    };
  }
}
