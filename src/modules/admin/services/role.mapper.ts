import { RoleEntity } from '../../../database/entities/role.entity';
import { RoleResDto } from '../models/dto/res/role/role.res.dto';

export class RoleMapper {
  public static toResDto(role: RoleEntity): RoleResDto {
    return {
      id: role.id,
      name: role.name,
      scope: role.scope,
      permissions: role.permissions
        ? role.permissions.map((permission) => permission)
        : [],
      admin_id: role.admin_id || null,
    };
  }
}
