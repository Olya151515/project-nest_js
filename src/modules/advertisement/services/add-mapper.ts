import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { BaseAdsResDto } from '../models/dto/res/base-ads.res.dto';

export class AddMapper {
  public static toResDto(add: AdvertisementEntity): BaseAdsResDto {
    return {
      id: add.id,
      description: add.description,
      title: add.title,
      location: add.location,
      price: add.price,
      status: add.status,
    };
  }
}
