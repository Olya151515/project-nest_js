import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { AccountEnum } from '../../../../../database/entities/enums/account-enum';
import { RoleEnum } from '../../../../../database/entities/enums/role-enum';
import { BaseAuthReqDto } from './base-auth-req.dto';

export class SignUpSellerReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'name',
  'deviceId',
  'phone',
]) {
  @IsString()
  @ApiProperty({
    enum: RoleEnum,
    example: 'seller',
  })
  role_name: string;

  @ApiProperty({
    description: 'Тип облікового запису',
    enum: AccountEnum,
    example: 'base',
  })
  @IsString()
  accountType: string;

  @IsString()
  shopName: string;

  @IsString()
  region: string;
}

export class SignUpSeller {
  name: string;
  email: string;
  password: string;
  phone: string;
  accountType: string;
  shopName: string;
  region: string;
}
