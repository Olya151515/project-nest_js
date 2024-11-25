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
import { ManagerEntity } from './manager.entity';
import { BaseUserEntity } from './models/base-user-model';
import { PermissionEntity } from './permissions.entity';
import { SellerEntity } from './seller.entity';

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
  })
  @JoinColumn({ name: 'admin_id' })
  createdBy?: AdminEntity;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  permissions: PermissionEntity[];

  @Column({ nullable: true })
  user_id: string;

  // Поліморфний зв'язок на базовий UserEntity
  @ManyToOne(() => BaseUserEntity, (user) => user.roles, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: BaseUserEntity;
}
