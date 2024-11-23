import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../req/base-user-req.dto';

export class BaseUserResDto extends PickType(BaseUserReqDto, [
  'name',
  'role',
  'phone',
  'email',
]) {}
