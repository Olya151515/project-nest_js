import { AdminEntity } from '../../../database/entities/admin.entity';
import { BaseUserResDto } from '../../auth/models/dto/res/base-user-res.dto';
import { BaseAdminResDto } from '../models/dto/res/base-admin.res.dto';

export class AdminMapper {
  public static toResDto(user: AdminEntity): BaseAdminResDto {
    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
