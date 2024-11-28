import { PickType } from '@nestjs/swagger';

import { RoleReqDto } from './role.req.dto';

export class UpdateRoleReqDto extends PickType(RoleReqDto, [
  'name',
  'scope',
  'permissions',
]) {}
