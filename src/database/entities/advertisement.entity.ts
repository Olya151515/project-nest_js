import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdvertisementID, SellerID } from '../../common/types/entity-ids.type';
import { BuyerEntity } from './buyer.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { SellerEntity } from './seller.entity';

@Entity(TableNameEnum.ADVERTISEMENT)
export class AdvertisementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AdvertisementID;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  location: string;

  @Column({ nullable: true })
  soldAt: Date | null;

  @Column('decimal', { precision: 10, scale: 3 })
  price: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  seller_id: SellerID;
  @ManyToOne(() => SellerEntity, (seller) => seller.advertisements)
  @JoinColumn({ name: 'seller_id' })
  seller: SellerEntity;

  @ManyToMany(() => BuyerEntity, (buyer) => buyer.favoriteAds)
  favoriteBuyers: BuyerEntity[];
}
