import { PermissionEntity } from '../../../../../../database/entities/permissions.entity';
import { BaseAdminResDto } from '../../../../../admin/models/dto/res/base-admin.res.dto';

export class RoleResDto {
  id: string;
  name: string;
  scope: string;
  permissions: PermissionEntity[];
  createdBy: BaseAdminResDto;
}
