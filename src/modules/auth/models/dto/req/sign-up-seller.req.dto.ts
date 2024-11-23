import { PickType } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

import {
  AccountEnum,
  AccountTypeArray,
} from '../../../../../database/entities/enums/account-enum';
import { BaseAuthReqDto } from './base-auth-req.dto';

export class SignUpSellerReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'name',
  'deviceId',
  'phone',
]) {
  @IsString()
  @IsIn(AccountTypeArray)
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
