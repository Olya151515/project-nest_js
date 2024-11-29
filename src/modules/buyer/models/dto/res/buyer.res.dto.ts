import { BaseAdsResDto } from '../../../../advertisement/models/dto/res/base-ads.res.dto';
import { BaseManagerResDto } from '../../../../manager/models/dto/res/manager/base-manager.res.dto';

export class BuyerResDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  role_scope: string;
  region: string;
  isBanned: boolean;
  banReason: string;
  bannedBy: BaseManagerResDto;
  favoriteAds: BaseAdsResDto[];
}
