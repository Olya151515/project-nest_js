import { AdminEntity } from '../../../database/entities/admin.entity';
import { EntitiesALl } from '../../../database/entities/enums/entities.enum';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { ManagerMapper } from '../../manager/services/manager.mapper';
import { RoleMapper } from '../../role/service/role.mapper';
import { AdminResDto } from '../models/dto/res/admin.res.dto';
import { BaseAdminResDto } from '../models/dto/res/base-admin.res.dto';

export class AdminMapper {
  public static toBaseResDto(user: AdminEntity): BaseAdminResDto {
    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      role: user.role,
      role_scope: user.role_scope,
    };
  }
  public static toResDto(admin: AdminEntity): AdminResDto {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      role_scope: admin.role_scope,
      phone: admin.phone,
      createdManagers: admin.createdManagers
        ? admin.createdManagers.map((manager) =>
            ManagerMapper.toBaseResDto(manager),
          )
        : null,
      createdPermissions: admin.createdPermissions
        ? admin.createdPermissions.map((permission) =>
            RoleMapper.toPermissionResDto(permission),
          )
        : null,
      createdRoles: admin.createdRoles
        ? admin.createdRoles.map((role) => RoleMapper.toShortRoleResDto(role))
        : null,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };
  }

  public static toIAdminData(
    user: AdminEntity,
    payload: IJwtPayload,
  ): Partial<IUserData> {
    return {
      user_id: user.id,
      email: user.email,
      role_name: user.role,
    };
  }
  public static toIUserData(
    user: EntitiesALl,
    payload: IJwtPayload,
  ): IUserData {
    return {
      user_id: user.entity.id,
      email: user.entity.email,
      role_name: user.entity.role,
      deviceId: payload.deviceId,
    };
  }
}
