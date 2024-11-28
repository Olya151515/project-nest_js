import { BaseAdminResDto } from '../../../../../admin/models/dto/res/base-admin.res.dto';

export class BaseManagerResDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  role_scope: string;
  department: string;
  createdBy: BaseAdminResDto;
}
