import { PickType } from '@nestjs/swagger';

import { SellerEntity } from '../../../../../../database/entities/seller.entity';
import { BaseAdminResDto } from '../../../../../admin/models/dto/res/base-admin.res.dto';
import { ShortBuyerResDto } from '../../../../../buyer/models/dto/res/short-buyer.res.dto';
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
  bannedSellers: SellerEntity[];
}
