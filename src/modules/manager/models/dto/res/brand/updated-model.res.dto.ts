import { PickType } from '@nestjs/swagger';

import { ModelResDto } from './model.res.dto';

export class UpdatedModelResDto extends PickType(ModelResDto, [
  'id',
  'name',
  'year',
]) {}
