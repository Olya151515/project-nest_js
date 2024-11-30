import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SellerEntity } from '../../../database/entities/seller.entity';

@Injectable()
export class SellersRepository extends Repository<SellerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SellerEntity, dataSource.manager);
  }
  async getMe(sellerId: string): Promise<SellerEntity> {
    const qb = this.createQueryBuilder('sellers');
    qb.leftJoinAndSelect('sellers.bannedBy', 'manager');
    qb.leftJoinAndSelect('sellers.advertisements', 'advertisements');
    qb.where('sellers.id = :sellerId', { sellerId });
    return await qb.getOne();
  }
}
