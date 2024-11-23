import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AdminID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseUser } from './models/base-user-model';
import { PermissionEntity } from './permissions.entity';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.ADMIN)
export class AdminEntity extends BaseUser {
  @PrimaryGeneratedColumn()
  id: AdminID;

  @OneToMany(() => RoleEntity, (role) => role.createdBy)
  createdRoles: RoleEntity[];

  @OneToMany(() => PermissionEntity, (permission) => permission.createdBy)
  createdPermissions: PermissionEntity[];

  @OneToMany(() => ManagerEntity, (manager) => manager.createdBy)
  createdManagers?: ManagerEntity[];
}
