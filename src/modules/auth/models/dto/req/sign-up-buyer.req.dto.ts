import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { SignUpReqDto } from './sign-up.req.dto';

export class SignUpBuyerReqDto extends PickType(SignUpReqDto, [
  'role',
  'role_scope',
  'email',
  'deviceId',
  'name',
  'phone',
  'password',
]) {
  @IsString()
  region: string;
}
