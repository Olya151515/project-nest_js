import { IsNumber, IsString } from 'class-validator';

export class ModelReqDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  // @IsString()
  // brand: string;
}
