import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { AccountEnum } from '../../../../../database/entities/enums/account-enum';
import { RoleEnum } from '../../../../../database/entities/enums/role-enum';
import { BaseAuthReqDto } from './base-auth-req.dto';

export class SignUpSellerReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'name',
  'deviceId',
  'phone',
  'role',
  'role_scope',
]) {
  @ApiProperty({
    description: 'Тип облікового запису',
    enum: AccountEnum,
    example: 'base',
  })
  @IsString()
  @IsEnum(AccountEnum)
  accountType: string;

  @IsString()
  shopName: string;

  @IsString()
  region: string;
}
