import { IsOptional } from 'class-validator';

export class UpdatedBuyerReqDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  region: string;
}
