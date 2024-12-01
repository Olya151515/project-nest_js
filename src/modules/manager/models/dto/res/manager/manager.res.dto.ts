import { PickType } from '@nestjs/swagger';

import { BaseAdminResDto } from '../../../../../admin/models/dto/res/base-admin.res.dto';
import { ShortBuyerResDto } from '../../../../../buyer/models/dto/res/short-buyer.res.dto';
import { BaseSellerResDto } from '../../../../../seller(user)/models/dto/res/base-seller.res.dto';
import { BaseManagerResDto } from './base-manager.res.dto';

export class ManagerResDto extends PickType(BaseManagerResDto, [
  'id',
  'name',
  'role',
  'email',
  'department',
  'phone',
  'role_scope',
]) {
  createdBy: BaseAdminResDto;
  bannedBuyers: ShortBuyerResDto[];
  bannedSellers: BaseSellerResDto[];
}
