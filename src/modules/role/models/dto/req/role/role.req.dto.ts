import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { ScopeEnum } from '../../../../../../database/entities/enums/scope.enum';

export class RoleReqDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @IsEnum(ScopeEnum, { message: 'scope must be either "global" or "local"' })
  @ApiProperty({ enum: ScopeEnum, example: 'global' })
  scope?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  permissions?: string[];
}
