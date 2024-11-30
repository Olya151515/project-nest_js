import { IsOptional, IsString } from 'class-validator';

export class UpdateSellerReqDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  shopName: string;

  @IsString()
  @IsOptional()
  region: string;

  @IsString()
  @IsOptional()
  phone: string;
}
