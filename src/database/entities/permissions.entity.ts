import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdminEntity } from './admin.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.PERMISSION)
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @Column()
  admin_id: string;
  @ManyToOne(() => AdminEntity)
  @JoinColumn({ name: 'admin_id' })
  createdBy?: AdminEntity;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  @JoinTable()
  roles: RoleEntity[];
}
