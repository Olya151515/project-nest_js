import { PickType } from '@nestjs/swagger';

import { BuyerEntity } from '../../../../../../database/entities/buyer.entity';
import { SellerEntity } from '../../../../../../database/entities/seller.entity';
import { BaseManagerResDto } from './base-manager.res.dto';

export class AllManagersResDto extends PickType(BaseManagerResDto, [
  'id',
  'name',
  'role',
  'email',
  'department',
  'phone',
  'role_scope',
  'createdBy',
]) {
  bannedBuyers: BuyerEntity[];
  bannedSellers: SellerEntity[];
}
