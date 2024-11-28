import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ManagerEntity } from '../../../database/entities/manager.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';

@Injectable()
export class ManagersRepository extends Repository<ManagerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ManagerEntity, dataSource.manager);
  }

  async findAll(userData: IUserData): Promise<ManagerEntity[]> {
    const qb = this.createQueryBuilder('managers');
    qb.leftJoinAndSelect('managers.createdBy', 'admin');
    qb.leftJoinAndSelect('managers.bannedBuyers', 'bannedBuyers');
    qb.leftJoinAndSelect('managers.bannedSellers', 'bannedSellers');

    return await qb.getMany();
  }
}
