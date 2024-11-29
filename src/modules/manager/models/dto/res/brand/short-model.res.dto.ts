import { PickType } from '@nestjs/swagger';

import { ModelResDto } from './model.res.dto';

export class ShortModelResDto extends PickType(ModelResDto, [
  'id',
  'name',
  'year',
]) {}
