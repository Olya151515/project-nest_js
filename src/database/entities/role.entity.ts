import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdminID, RoleID } from '../../common/types/entity-ids.type';
import { AdminEntity } from './admin.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { PermissionEntity } from './permissions.entity';

@Entity(TableNameEnum.ROLE)
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: RoleID;

  @Column()
  name: string;

  @Column()
  scope: string;

  @Column()
  admin_id: AdminID;
  @ManyToOne(() => AdminEntity, (admin) => admin.createdRoles, {
    nullable: true,
  })
  @JoinColumn({ name: 'admin_id' })
  createdBy: AdminEntity;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable()
  permissions: PermissionEntity[];
}
