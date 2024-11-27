import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdminEntity } from '../../../database/entities/admin.entity';
import { RoleEntity } from '../../../database/entities/role.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RoleEntity, dataSource.manager);
  }

  async findAll(userData: IUserData): Promise<RoleEntity[]> {
    const qb = this.createQueryBuilder('roles');
    qb.leftJoinAndSelect('roles.permissions', 'permissions');

    qb.leftJoinAndSelect('roles.createdBy', 'admin');
    //     .where(
    //   'roles.admin_id = :userId',
    //   { userId: userData.user_id },
    // );

    return await qb.getMany();
  }

  async initializeAdminRole(user: AdminEntity): Promise<RoleEntity> {
    const existAdminRole = await this.findOneBy({
      name: 'admin',
    });
    if (!existAdminRole) {
      return await this.save(
        this.create({
          name: 'admin',
          scope: 'global',
          admin_id: user.id,
        }),
      );
    } else {
      return existAdminRole;
    }
  }
}
