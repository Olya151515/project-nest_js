import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BuyerID, ManagerID, RoleID } from '../../common/types/entity-ids.type';
import { AdvertisementEntity } from './advertisement.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseUser } from './models/base-user-model';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.BUYER)
export class BuyerEntity extends BaseUser {
  @PrimaryGeneratedColumn('uuid')
  id: BuyerID;

  @Column()
  region: string;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ nullable: true })
  banReason: string;

  @Column()
  role_id: RoleID;
  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @Column()
  manager_id: ManagerID;
  @ManyToOne(() => ManagerEntity, (manager) => manager.bannedBuyers, {
    nullable: true,
  })
  @JoinColumn({ name: 'manager_id' })
  bannedBy: ManagerEntity;

  @ManyToMany(() => AdvertisementEntity, (ad) => ad.favoriteBuyers)
  @JoinTable()
  favoriteAds: AdvertisementEntity[];
}
