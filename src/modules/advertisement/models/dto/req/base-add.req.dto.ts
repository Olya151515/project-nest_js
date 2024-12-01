import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';

import { TransformerHelper } from '../../../../../common/helpers/transformer.helper';

export class BaseAddReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformerHelper.trim)
  @Type(() => String)
  title: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformerHelper.trim)
  @Type(() => String)
  description: string;

  @IsString()
  location: string;

  @IsNumber()
  price: number;

  @IsString()
  brand: string;

  @IsString()
  model: string;
}
