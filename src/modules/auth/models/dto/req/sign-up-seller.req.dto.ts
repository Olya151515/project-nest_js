import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { BaseAuthReqDto } from './base-auth-req.dto';

export class SignUpSellerReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'name',
  'deviceId',
  'role',
  'phone',
]) {
  @IsString()
  shopName: string;
  @IsString()
  region: string;
}
