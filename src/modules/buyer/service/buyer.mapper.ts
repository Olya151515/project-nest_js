import { BuyerEntity } from '../../../database/entities/buyer.entity';
import { ManagerMapper } from '../../manager/services/manager.mapper';
import { BuyerResDto } from '../models/dto/res/buyer.res.dto';
import { ShortBuyerResDto } from '../models/dto/res/short-buyer.res.dto';
import { UpdatedBuyerResDto } from '../models/dto/res/updated-buyer.res.dto';

export class BuyerMapper {
  public static toBuyerResDto(buyer: BuyerEntity): BuyerResDto {
    return {
      id: buyer.id,
      name: buyer.name,
      email: buyer.email,
      region: buyer.region,
      phone: buyer.phone,
      role: buyer.role,
      role_scope: buyer.role_scope,
      isBanned: buyer.isBanned,
      banReason: buyer.banReason,
      bannedBy: buyer.bannedBy
        ? ManagerMapper.toBaseResDto(buyer.bannedBy)
        : null,
      favoriteAds: buyer.favoriteAds ? [] : null,
    };
  }
  public static toUpdatedBuyerResDto(buyer: BuyerEntity): UpdatedBuyerResDto {
    return {
      id: buyer.id,
      name: buyer.name,
      email: buyer.email,
      region: buyer.region,
      phone: buyer.phone,
    };
  }
  public static toShortBuyerResDto(buyer: BuyerEntity): ShortBuyerResDto {
    return {
      id: buyer.id,
      name: buyer.name,
      region: buyer.region,
      role_scope: buyer.role_scope,
      role: buyer.role,
      email: buyer.email,
      isBanned: buyer.isBanned,
    };
  }
}
