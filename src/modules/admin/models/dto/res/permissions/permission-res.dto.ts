import { RoleEntity } from '../../../../../../database/entities/role.entity';

export class PermissionResDto {
  id: string;
  action: string;
  roles: RoleEntity[];
  admin_id?: string;
}
