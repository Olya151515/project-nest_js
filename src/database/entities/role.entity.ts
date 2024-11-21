import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleID } from '../../common/types/entity-ids.type';
import { ScopeEnum } from './enums/scope.enum';
import { PermissionEntity } from './permissions.entity';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: RoleID;

  @Column()
  name: string;

  @Column()
  scope: ScopeEnum;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  permissions: PermissionEntity[];
}
