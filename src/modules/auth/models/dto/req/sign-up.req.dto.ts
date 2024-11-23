import { PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { BaseAuthReqDto } from './base-auth-req.dto';

export class SignUpReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'name',
  'deviceId',
  'role',
  'phone',
]) {}
export class SignUpDtoReq {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  phone: string;

  @IsString()
  deviceId: string;
  @IsString()
  department?: string;
}
