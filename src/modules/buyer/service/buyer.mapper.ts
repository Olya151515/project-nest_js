import { BuyerEntity } from '../../../database/entities/buyer.entity';
import { BuyerResDto } from '../models/dto/res/buyer.res.dto';

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
      bannedBy: buyer.bannedBy ? buyer.bannedBy : null,
      favoriteAds: buyer.favoriteAds ? [] : null,
    };
  }
}
