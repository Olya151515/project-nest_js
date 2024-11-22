import { IsEmail, IsString } from 'class-validator';

import { RoleEnum } from '../../../database/entities/enums/role-enum';

export class SignUpDtoReq {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  role: RoleEnum;
}
