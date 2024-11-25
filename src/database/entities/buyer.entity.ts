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
import { BaseUserEntity } from './models/base-user-model';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.BUYER)
export class BuyerEntity extends BaseUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  region: string;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ nullable: true })
  banReason: string;

  // @Column()
  // role_id: string;
  // @ManyToOne(() => RoleEntity, (role) => role.id)
  // @JoinColumn({ name: 'role_id' })
  // role: RoleEntity;

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
