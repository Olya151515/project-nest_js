import { PickType } from '@nestjs/swagger';

import { PermissionResDto } from './permission-res.dto';

export class ShortPermissionResDto extends PickType(PermissionResDto, [
  'id',
  'action',
]) {}
