import { PickType } from '@nestjs/swagger';

import { BuyerResDto } from './buyer.res.dto';

export class ShortBuyerResDto extends PickType(BuyerResDto, [
  'id',
  'region',
  'email',
  'name',
  'isBanned',
  'role_scope',
  'role',
]) {}
