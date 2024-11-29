import { IsString } from 'class-validator';

export class UserBanReqDto {
  @IsString()
  banReason: string;
}
