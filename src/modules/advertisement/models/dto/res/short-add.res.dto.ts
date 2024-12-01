import { PickType } from '@nestjs/swagger';

import { BaseAdsResDto } from './base-ads.res.dto';

export class ShortAddResDto extends PickType(BaseAdsResDto, [
  'id',
  'price',
  'title',
  'description',
  'location',
  'status',
  'images',
]) {}
