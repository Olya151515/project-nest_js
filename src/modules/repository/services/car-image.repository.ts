import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarImageEntity } from '../../../database/entities/car-image.entity';

@Injectable()
export class CarImageRepository extends Repository<CarImageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarImageEntity, dataSource.manager);
  }
}
