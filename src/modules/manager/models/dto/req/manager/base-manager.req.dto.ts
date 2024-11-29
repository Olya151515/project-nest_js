import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserReqDto } from '../../../../../auth/models/dto/req/base-user-req.dto';

export class BaseManagerReqDto extends PickType(BaseUserReqDto, [
  'role',
  'name',
  'email',
  'password',
  'role_scope',
  'phone',
]) {
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}