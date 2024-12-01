import { PickType } from '@nestjs/swagger';

import { ShortBuyerResDto } from '../../../../buyer/models/dto/res/short-buyer.res.dto';
import { BaseAdsResDto } from './base-ads.res.dto';

export class AddResDto extends PickType(BaseAdsResDto, [
  'id',
  'title',
  'description',
  'location',
  'status',
  'price',
  'images',
  'brand',
  'model',
  'seller',
  'soldAt',
]) {
  favoriteBuyers: ShortBuyerResDto[];
}
