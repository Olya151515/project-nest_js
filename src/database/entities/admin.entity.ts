import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseUserEntity } from './models/base-user-model';
import { PermissionEntity } from './permissions.entity';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.ADMIN)
export class AdminEntity extends BaseUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => RoleEntity, (role) => role.createdBy)
  createdRoles: RoleEntity[];

  @OneToMany(() => PermissionEntity, (permission) => permission.createdBy)
  createdPermissions: PermissionEntity[];

  @OneToMany(() => ManagerEntity, (manager) => manager.createdBy)
  createdManagers?: ManagerEntity[];
  //
  // @Column()
  // role_id: RoleID;
  // @ManyToOne(() => RoleEntity)
  // @JoinColumn({ name: 'role_id' })
  @Column({ default: 'admin' })
  role: string;
}
