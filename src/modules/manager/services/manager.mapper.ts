import { ManagerEntity } from '../../../database/entities/manager.entity';
import { AdminMapper } from '../../admin/services/admin.mapper';
import { BuyerMapper } from '../../buyer/service/buyer.mapper';
import { SellerMapper } from '../../seller(user)/services/seller.mapper';
import { BaseManagerResDto } from '../models/dto/res/manager/base-manager.res.dto';
import { ManagerResDto } from '../models/dto/res/manager/manager.res.dto';

export class ManagerMapper {
  public static toBaseResDto(manager: ManagerEntity): BaseManagerResDto {
    return {
      id: manager.id,
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      role: manager.role,
      role_scope: manager.role_scope,
      department: manager.department,
    };
  }
  public static toResDto(manager: ManagerEntity): ManagerResDto {
    return {
      id: manager.id,
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      role: manager.role,
      role_scope: manager.role_scope,
      department: manager.department,
      createdBy: manager.createdBy
        ? AdminMapper.toBaseResDto(manager.createdBy)
        : null,
      bannedBuyers: manager.bannedBuyers
        ? manager.bannedBuyers.map((buyer) =>
            BuyerMapper.toShortBuyerResDto(buyer),
          )
        : [],
      bannedSellers: manager.bannedSellers
        ? manager.bannedSellers.map((seller) =>
            SellerMapper.toBaseSellerResDto(seller),
          )
        : null,
    };
  }
}
