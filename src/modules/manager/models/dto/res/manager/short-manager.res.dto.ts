import { PickType } from '@nestjs/swagger';

import { BaseManagerResDto } from './base-manager.res.dto';

export class ShortManagerResDto extends PickType(BaseManagerResDto, [
  'id',
  'name',
  'email',
  'role',
  'role_scope',
  'department',
]) {}
