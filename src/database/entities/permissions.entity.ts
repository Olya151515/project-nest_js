import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdminID, PermissionID } from '../../common/types/entity-ids.type';
import { AdminEntity } from './admin.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.PERMISSION)
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: PermissionID;

  @Column()
  action: string;

  @Column()
  admin_id: AdminID;
  @ManyToOne(() => AdminEntity, { nullable: true })
  @JoinColumn({ name: 'admin_id' })
  createdBy: AdminEntity;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
