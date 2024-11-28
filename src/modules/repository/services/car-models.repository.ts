import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarModelEntity } from '../../../database/entities/car-model.entity';

@Injectable()
export class CarModelsRepository extends Repository<CarModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarModelEntity, dataSource.manager);
  }
  async findAll(): Promise<CarModelEntity[]> {
    const qb = this.createQueryBuilder('car-models');
    qb.leftJoinAndSelect('car-models.brand', 'brand');
    return await qb.getMany();
  }
}
