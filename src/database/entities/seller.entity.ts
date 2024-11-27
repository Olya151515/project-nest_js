import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { AccountEnum } from './enums/account-enum';
import { TableNameEnum } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseUserModel } from './models/base-user.model';

@Entity(TableNameEnum.SELLER)
export class SellerEntity extends BaseUserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: AccountEnum.BASE })
  accountType: string;

  @Column()
  shopName: string;

  @Column()
  region: string;

  @Column({ default: false })
  isBanned?: boolean;

  @Column({ nullable: true })
  banReason?: string;

  @OneToMany(() => AdvertisementEntity, (ad) => ad.seller)
  advertisements?: AdvertisementEntity[];

  @Column({ nullable: true })
  manager_id: string;
  @ManyToOne(() => ManagerEntity, (manager) => manager.bannedSellers, {
    nullable: true,
  })
  @JoinColumn({ name: 'manager_id' })
  bannedBy?: ManagerEntity;

  // @Column()
  // role_name: string;

  // @Column()
  // role_id: string;
  // @ManyToOne(() => RoleEntity, (role) => role.id)
  // @JoinColumn({ name: 'role_id' })
  // role: RoleEntity;
}
