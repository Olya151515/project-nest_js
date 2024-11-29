import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ModelReqDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  // @IsString()
  // brand: string;
}
