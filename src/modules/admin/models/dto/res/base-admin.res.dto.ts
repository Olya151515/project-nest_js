import { ApiProperty, PickType } from '@nestjs/swagger';

import { BaseUserResDto } from '../../../../auth/models/dto/res/base-user-res.dto';

export class BaseAdminResDto extends PickType(BaseUserResDto, [
  'role',
  'email',
  'name',
  'phone',
]) {
  @ApiProperty()
  id: string;
}
