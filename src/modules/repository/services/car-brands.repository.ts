import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarBrandsEntity } from '../../../database/entities/car-brands.entity';

@Injectable()
export class CarBrandsRepository extends Repository<CarBrandsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarBrandsEntity, dataSource.manager);
  }

  async findAll(): Promise<CarBrandsEntity[]> {
    const qb = this.createQueryBuilder('car-brands');
    qb.leftJoinAndSelect('car-brands.models', 'models');
    return await qb.getMany();
  }
}
