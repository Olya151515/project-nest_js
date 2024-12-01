import { PickType } from '@nestjs/swagger';

import { BaseAdsResDto } from '../../../../advertisement/models/dto/res/base-ads.res.dto';
import { ShortAddResDto } from '../../../../advertisement/models/dto/res/short-add.res.dto';
import { BaseManagerResDto } from '../../../../manager/models/dto/res/manager/base-manager.res.dto';
import { BaseSellerResDto } from './base-seller.res.dto';

export class SellerResDto extends PickType(BaseSellerResDto, [
  'id',
  'name',
  'email',
  'isBanned',
  'region',
  'role',
  'role_scope',
  'shopName',
  'phone',
]) {
  accountType: string;
  premiumExpiry: Date | null;
  banReason: string | null;
  bannedBy?: BaseManagerResDto;
  advertisements?: ShortAddResDto[];
}
