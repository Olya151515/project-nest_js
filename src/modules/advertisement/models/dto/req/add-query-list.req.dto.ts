import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { TransformerHelper } from '../../../../../common/helpers/transformer.helper';

export class AddQueryListReqDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

  @IsString()
  @IsOptional()
  location?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0)
  price?: number;

  @Transform(TransformerHelper.trim)
  @Transform(TransformerHelper.toLowerCase)
  @IsString()
  @IsOptional()
  search?: string;
}
