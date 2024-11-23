import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SellerEntity } from '../../../database/entities/seller.entity';

@Injectable()
export class SellersRepository extends Repository<SellerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SellerEntity, dataSource.manager);
  }
}
