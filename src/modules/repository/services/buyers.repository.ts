import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BuyerEntity } from '../../../database/entities/buyer.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';

@Injectable()
export class BuyersRepository extends Repository<BuyerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BuyerEntity, dataSource.manager);
  }
  async findMe(userData: IUserData): Promise<BuyerEntity> {
    const qb = this.createQueryBuilder('buyers');
    qb.leftJoinAndSelect('buyers.bannedBy', 'managers');
    qb.leftJoinAndSelect('buyers.favoriteAds', 'advertisements');
    return await qb.getOne();
  }
}
