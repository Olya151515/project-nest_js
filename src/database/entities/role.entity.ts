import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdminEntity } from './admin.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseUserModel } from './models/base-user.model';
import { PermissionEntity } from './permissions.entity';
import { UsersEntity } from './users.entity';

@Entity(TableNameEnum.ROLE)
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  scope: string;

  @Column({ nullable: false })
  admin_id: string;
  @ManyToOne(() => AdminEntity, (admin) => admin.createdRoles, {
    onDelete: 'CASCADE', // якщо видалиться admin , тоді і видалити його roles
    nullable: true,
  })
  @JoinColumn({ name: 'admin_id' })
  createdBy?: AdminEntity;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    onDelete: 'CASCADE',
  })
  permissions: PermissionEntity[];

  @OneToMany(() => UsersEntity, (user) => user.role, { nullable: true })
  users?: BaseUserModel[];
}
