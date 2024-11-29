import { PickType } from '@nestjs/swagger';

import { RoleResDto } from './role.res.dto';

export class ShortRoleResDto extends PickType(RoleResDto, [
  'id',
  'name',
  'scope',
]) {}
