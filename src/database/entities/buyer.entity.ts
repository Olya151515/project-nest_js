import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ManagerID } from '../../common/types/entity-ids.type';
import { AdvertisementEntity } from './advertisement.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseUserModel } from './models/base-user.model';

@Entity(TableNameEnum.BUYER)
export class BuyerEntity extends BaseUserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  region: string;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ nullable: true })
  banReason: string;

  @Column({ nullable: true })
  manager_id: string;
  @ManyToOne(() => ManagerEntity, (manager) => manager.bannedBuyers, {
    nullable: true,
  })
  @JoinColumn({ name: 'manager_id' })
  bannedBy: ManagerEntity;

  @ManyToMany(() => AdvertisementEntity, (ad) => ad.favoriteBuyers)
  @JoinTable()
  favoriteAds: AdvertisementEntity[];
}
