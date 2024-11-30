import { IsOptional } from 'class-validator';

export class UpdateAddReqDto {
  @IsOptional()
  description?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  location?: string;
}
