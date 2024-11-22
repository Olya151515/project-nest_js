import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PermissionID } from '../../common/types/entity-ids.type';
import { ActionEnum } from './enums/action.enum';
import { EntityEnum } from './enums/entity.enum';
import { RoleEntity } from './role.entity';

@Entity()
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: PermissionID;

  // @Column({ type: 'enum', enum: EntityEnum })
  // entity: EntityEnum;

  // @Column({ type: 'enum', enum: ActionEnum })
  // action: ActionEnum;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
