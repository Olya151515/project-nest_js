import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdminEntity } from '../../../database/entities/admin.entity';

@Injectable()
export class AdminRepository extends Repository<AdminEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdminEntity, dataSource.manager);
  }

  async findMe(adminId: string): Promise<AdminEntity> {
    const qb = this.createQueryBuilder('admin');
    qb.leftJoinAndSelect('admin.createdRoles', 'roles');
    qb.leftJoinAndSelect('admin.createdPermissions', 'permissions');
    qb.leftJoinAndSelect('admin.createdManagers', 'managers');
    qb.where('admin.id = :adminId', { adminId });
    return await qb.getOne();
  }
}
