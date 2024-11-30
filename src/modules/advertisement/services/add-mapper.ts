import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { BuyerMapper } from '../../buyer/service/buyer.mapper';
import { SellerMapper } from '../../seller(user)/services/seller.mapper';
import { AddResDto } from '../models/dto/res/add.res.dto';
import { BaseAdsResDto } from '../models/dto/res/base-ads.res.dto';

export class AddMapper {
  public static toBaseResDto(add: AdvertisementEntity): BaseAdsResDto {
    return {
      id: add.id,
      description: add.description,
      title: add.title,
      location: add.location,
      price: add.price,
      status: add.status,
      images: add.images.map((image) => image.imageUrl),
    };
  }
  public static toResDto(add: AdvertisementEntity): AddResDto {
    return {
      id: add.id,
      title: add.title,
      description: add.description,
      location: add.location,
      price: add.price,
      status: add.status,
      soldAt: add.soldAt,
      editAttempts: add.editAttempts,
      images: add.images.map((image) => image.imageUrl),
      favoriteBuyers: add.favoriteBuyers
        ? add.favoriteBuyers.map((buyer) =>
            BuyerMapper.toShortBuyerResDto(buyer),
          )
        : null,
      seller: SellerMapper.toBaseSellerResDto(add.seller),
    };
  }
}
