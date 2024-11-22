import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsOptional, IsString, Length, Matches } from 'class-validator';

import { TransformerHelper } from '../../../../../common/helpers/transformer.helper';
import { RoleEnumArray } from '../../../../../database/entities/enums/role-enum';

export class BaseUserReqDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformerHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  @Length(0, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @IsString()
  @Length(0, 10)
  phone?: string;

  @IsString()
  @IsIn(RoleEnumArray)
  role: string;
}
