import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminReqDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
