import { IsArray, IsString } from 'class-validator';

import { ModelReqDto } from './model.req.dto';

export class BrandReqDto {
  @IsString()
  name: string;

  @IsArray()
  models: ModelReqDto[];
}
