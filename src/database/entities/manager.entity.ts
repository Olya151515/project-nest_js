import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ManagerID, RoleID } from '../../common/types/entity-ids.type';
import { AdminEntity } from './admin.entity';
import { BuyerEntity } from './buyer.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseUser } from './models/base-user-model';
import { RoleEntity } from './role.entity';
import { SellerEntity } from './seller.entity';

@Entity(TableNameEnum.MANAGER)
export class ManagerEntity extends BaseUser {
  @PrimaryGeneratedColumn('uuid')
  id: ManagerID;

  @Column()
  department?: string;

  @OneToMany(() => BuyerEntity, (buyer) => buyer.bannedBy)
  bannedBuyers?: BuyerEntity[];

  @OneToMany(() => SellerEntity, (seller) => seller.bannedBy)
  bannedSellers?: SellerEntity[];

  @ManyToOne(() => AdminEntity, (admin) => admin.createdManagers, {
    nullable: true,
  })
  createdBy?: AdminEntity;

  @Column()
  role_id: RoleID;
  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
