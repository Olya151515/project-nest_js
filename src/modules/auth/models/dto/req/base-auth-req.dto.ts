import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { RoleEnum } from '../../../../../database/entities/enums/role-enum';
import { BaseUserReqDto } from './base-user-req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'name',
  'phone',
]) {
  @IsString()
  //@IsIn(RoleEnumArray)
  @ApiProperty({
    enum: RoleEnum,
  })
  role: string;
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string; // щоб привязувати tokens до конкретного device , щоб потім ідентифікувати девайси
}
