import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleID } from '../../common/types/entity-ids.type';
import { AdminEntity } from './admin.entity';
import { BuyerEntity } from './buyer.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseUserEntity } from './models/base-user-model';
import { RoleEntity } from './role.entity';
import { SellerEntity } from './seller.entity';

@Entity(TableNameEnum.MANAGER)
export class ManagerEntity extends BaseUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  department?: string;

  @OneToMany(() => BuyerEntity, (buyer) => buyer.bannedBy, { nullable: true })
  bannedBuyers?: BuyerEntity[];

  @OneToMany(() => SellerEntity, (seller) => seller.bannedBy, {
    nullable: true,
  })
  bannedSellers?: SellerEntity[];

  @ManyToOne(() => AdminEntity, (admin) => admin.createdManagers)
  createdBy?: AdminEntity;

  // @Column()
  // role_id: RoleID;
  // @ManyToOne(() => RoleEntity, (role) => role.id)
  // @JoinColumn({ name: 'role_id' })
  // role: RoleEntity;
}
