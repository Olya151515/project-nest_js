import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';

import { ScopeEnum } from '../../../../../../database/entities/enums/scope.enum';

export class RoleReqDto {
  @IsString()
  name: string;

  @IsString()
  @IsEnum(ScopeEnum, { message: 'scope must be either "global" or "local"' })
  @ApiProperty({ enum: ScopeEnum, example: 'global' })
  scope: string;

  @IsArray()
  @IsString({ each: true })
  @Length(3, 30, { each: true })
  @ArrayMaxSize(5)
  permissions: string[];
}
