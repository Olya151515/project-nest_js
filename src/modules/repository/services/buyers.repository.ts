import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BuyerEntity } from '../../../database/entities/buyer.entity';

@Injectable()
export class BuyersRepository extends Repository<BuyerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BuyerEntity, dataSource.manager);
  }
}
