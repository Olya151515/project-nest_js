import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { PermissionEntity } from './permissions.entity';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.ADMIN)
export class AdminEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column()
  role_scope: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => RoleEntity, (role) => role.createdBy)
  createdRoles: RoleEntity[];

  @OneToMany(() => PermissionEntity, (permission) => permission.createdBy)
  createdPermissions: PermissionEntity[];

  @OneToMany(() => ManagerEntity, (manager) => manager.createdBy)
  createdManagers?: ManagerEntity[];
}
