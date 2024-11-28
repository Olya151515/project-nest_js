import { AdvertisementEntity } from '../../../../../database/entities/advertisement.entity';
import { ManagerEntity } from '../../../../../database/entities/manager.entity';

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
  bannedBy: ManagerEntity;
  favoriteAds: AdvertisementEntity[];
}
