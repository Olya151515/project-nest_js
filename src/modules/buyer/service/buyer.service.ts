import { Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/models/interfaces/user-data';
import { BuyersRepository } from '../../repository/services/buyers.repository';
import { BuyerResDto } from '../models/dto/res/buyer.res.dto';
import { BuyerMapper } from './buyer.mapper';

@Injectable()
export class BuyerService {
  constructor(private readonly buyerRepository: BuyersRepository) {}
  public async getMe(userData: IUserData): Promise<BuyerResDto> {
    const buyer = await this.buyerRepository.findOneBy({
      id: userData.user_id,
    });
    return BuyerMapper.toBuyerResDto(buyer);
  }
}
