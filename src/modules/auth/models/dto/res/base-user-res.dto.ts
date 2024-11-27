import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { RoleEnum } from '../../../../../database/entities/enums/role-enum';
import { RoleEntity } from '../../../../../database/entities/role.entity';
import { BaseUserReqDto } from '../req/base-user-req.dto';

export class BaseUserResDto extends PickType(BaseUserReqDto, [
  'name',
  'phone',
  'email',
  'role',
  'role_scope',
]) {
  // @IsString()
  // //@IsIn(RoleEnumArray)
  // @ApiProperty({
  //   enum: RoleEnum,
  // })
  // role: RoleEntity;
}
