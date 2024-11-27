import { PermissionEntity } from '../../../../../../database/entities/permissions.entity';

export class RoleResDto {
  id: string;
  name: string;
  scope: string;
  permissions: PermissionEntity[];
  admin_id?: string;
}
