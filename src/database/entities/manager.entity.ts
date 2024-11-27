import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdminEntity } from './admin.entity';
import { BuyerEntity } from './buyer.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseUserModel } from './models/base-user.model';
import { SellerEntity } from './seller.entity';

@Entity(TableNameEnum.MANAGER)
export class ManagerEntity extends BaseUserModel {
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
