import { PickType } from '@nestjs/swagger';

import { BuyerResDto } from './buyer.res.dto';

export class UpdatedBuyerResDto extends PickType(BuyerResDto, [
  'id',
  'name',
  'email',
  'phone',
  'region',
]) {}
