import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { BuyerMapper } from '../../buyer/service/buyer.mapper';
import { SellerMapper } from '../../seller(user)/services/seller.mapper';
import { AddResDto } from '../models/dto/res/add.res.dto';
import { BaseAdsResDto } from '../models/dto/res/base-ads.res.dto';
import { ShortAddResDto } from '../models/dto/res/short-add.res.dto';

export class AddMapper {
  public static toBaseResDto(add: AdvertisementEntity): BaseAdsResDto {
    return {
      id: add.id,
      description: add.description,
      title: add.title,
      location: add.location,
      price: add.price,
      status: add.status,
      brand: add.brand?.name,
      model: add.brand?.name,
      seller: SellerMapper.toBaseSellerResDto(add.seller),
      images: add.images ? add.images.map((image) => image.imageUrl) : null,
      soldAt: add.soldAt,
    };
  }
  public static toShortResDto(add: AdvertisementEntity): ShortAddResDto {
    return {
      id: add.id,
      description: add.description,
      title: add.title,
      location: add.location,
      price: add.price,
      status: add.status,
      images: add.images ? add.images.map((image) => image.imageUrl) : null,
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
      brand: add.brand.name,
      model: add.model.name,
      images: add.images ? add.images.map((image) => image.imageUrl) : null,
      favoriteBuyers: add.favoriteBuyers
        ? add.favoriteBuyers.map((buyer) =>
            BuyerMapper.toShortBuyerResDto(buyer),
          )
        : null,
      seller: SellerMapper.toBaseSellerResDto(add.seller),
    };
  }
}
