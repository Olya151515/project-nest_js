import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  ManagerID,
  RoleID,
  SellerID,
} from '../../common/types/entity-ids.type';
import { AdvertisementEntity } from './advertisement.entity';
import { AccountEnum } from './enums/account-enum';
import { TableNameEnum } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseUser } from './models/base-user-model';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.SELLER)
export class SellerEntity extends BaseUser {
  @PrimaryGeneratedColumn('uuid')
  id: SellerID;

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

  @Column()
  manager_id: ManagerID;
  @ManyToOne(() => ManagerEntity, (manager) => manager.bannedSellers, {
    nullable: true,
  })
  @JoinColumn({ name: 'manager_id' })
  bannedBy: ManagerEntity;

  @Column()
  role_id: RoleID;
  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
