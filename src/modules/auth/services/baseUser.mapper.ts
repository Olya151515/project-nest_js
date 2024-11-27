import { AdminEntity } from '../../../database/entities/admin.entity';
import { BuyerEntity } from '../../../database/entities/buyer.entity';
import { ManagerEntity } from '../../../database/entities/manager.entity';
import { SellerEntity } from '../../../database/entities/seller.entity';
import { BaseAdminResDto } from '../../admin/models/dto/res/base-admin.res.dto';

export class BaseUserMapper {
  public static toResDto(
    user: ManagerEntity | SellerEntity | BuyerEntity,
  ): BaseAdminResDto {
    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      role: user.role,
      role_scope: user.role_scope,
    };
  }
}
