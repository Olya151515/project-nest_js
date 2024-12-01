import { SellerEntity } from '../../../database/entities/seller.entity';
import { AddMapper } from '../../advertisement/services/add-mapper';
import { ManagerMapper } from '../../manager/services/manager.mapper';
import { BaseSellerResDto } from '../models/dto/res/base-seller.res.dto';
import { SellerResDto } from '../models/dto/res/seller.res.dto';

export class SellerMapper {
  public static toBaseSellerResDto(seller: SellerEntity): BaseSellerResDto {
    return {
      id: seller.id,
      name: seller.name,
      email: seller.email,
      role: seller.role,
      role_scope: seller.role_scope,
      shopName: seller.shopName,
      phone: seller.phone,
      isBanned: seller.isBanned,
      region: seller.region,
    };
  }
  public static toResDto(seller: SellerEntity): SellerResDto {
    return {
      id: seller.id,
      name: seller.name,
      email: seller.email,
      role: seller.role,
      role_scope: seller.role_scope,
      accountType: seller.accountType,
      premiumExpiry: seller.premiumExpiry,
      shopName: seller.shopName,
      phone: seller.phone,
      isBanned: seller.isBanned,
      region: seller.region,
      banReason: seller.banReason,
      bannedBy: seller.bannedBy
        ? ManagerMapper.toBaseResDto(seller.bannedBy)
        : null,
      advertisements: seller.advertisements
        ? seller.advertisements.map((add) => AddMapper.toShortResDto(add))
        : null,
    };
  }
}
