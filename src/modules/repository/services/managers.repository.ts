import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ManagerEntity } from '../../../database/entities/manager.entity';

@Injectable()
export class ManagersRepository extends Repository<ManagerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ManagerEntity, dataSource.manager);
  }
}
