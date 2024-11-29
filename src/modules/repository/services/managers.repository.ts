import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ManagerEntity } from '../../../database/entities/manager.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';

@Injectable()
export class ManagersRepository extends Repository<ManagerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ManagerEntity, dataSource.manager);
  }
  async findMe(managerId: string): Promise<ManagerEntity> {
    const qb = this.createQueryBuilder('managers');
    qb.leftJoinAndSelect('managers.createdBy', 'admin');
    qb.leftJoinAndSelect('managers.bannedBuyers', 'buyers');
    qb.leftJoinAndSelect('managers.bannedSellers', 'sellers');

    qb.where('managers.id = :managerId', { managerId });
    return await qb.getOne();
  }

  async findAll(userData: IUserData): Promise<ManagerEntity[]> {
    const qb = this.createQueryBuilder('managers');
    qb.leftJoinAndSelect('managers.createdBy', 'admin');
    qb.leftJoinAndSelect('managers.bannedBuyers', 'bannedBuyers');
    qb.leftJoinAndSelect('managers.bannedSellers', 'bannedSellers');

    return await qb.getMany();
  }

  async findOneManager(
    managerId: string,
    userData: IUserData,
  ): Promise<ManagerEntity> {
    const qb = this.createQueryBuilder('managers');
    qb.leftJoinAndSelect('managers.createdBy', 'admin');
    qb.leftJoinAndSelect('managers.bannedBuyers', 'bannedBuyers');
    qb.leftJoinAndSelect('managers.bannedSellers', 'bannedSellers');

    qb.where('managers.id = :managerId', { managerId });
    return await qb.getOne();
  }
}
