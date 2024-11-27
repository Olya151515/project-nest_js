import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PermissionEntity } from '../../../database/entities/permissions.entity';

@Injectable()
export class PermissionRepository extends Repository<PermissionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PermissionEntity, dataSource.manager);
  }
  async findAll(): Promise<PermissionEntity[]> {
    const qb = this.createQueryBuilder('permissions');
    qb.leftJoinAndSelect('permissions.roles', 'roles');
    qb.leftJoinAndSelect('permissions.createdBy', 'admin');

    return await qb.getMany();
  }
}
