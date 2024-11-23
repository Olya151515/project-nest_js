import { ITokenPair } from '../../interfaces/token-pair.interface';
import { BaseUserResDto } from './base-user-res.dto';

export class AuthResDto {
  tokens: ITokenPair;
  user: BaseUserResDto;
}
