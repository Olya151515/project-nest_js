import { IsOptional } from 'class-validator';

export class UpdatedBuyerReqDto {
  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  region: string;
}
