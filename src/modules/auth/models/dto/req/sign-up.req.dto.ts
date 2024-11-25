import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { RoleEnum } from '../../../../../database/entities/enums/role-enum';
import { RoleEntity } from '../../../../../database/entities/role.entity';
import { BaseAuthReqDto } from './base-auth-req.dto';

export class SignUpReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'name',
  'deviceId',
  'phone',
]) {
  @IsString()
  //@IsIn(RoleEnumArray)
  @ApiProperty({
    enum: RoleEnum,
  })
  role: string;
}
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
