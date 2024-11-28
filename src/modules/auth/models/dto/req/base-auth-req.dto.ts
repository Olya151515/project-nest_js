import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserReqDto } from './base-user-req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'name',
  'phone',
  'role',
  'role_scope',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string; // щоб привязувати tokens до конкретного device , щоб потім ідентифікувати девайси
}
