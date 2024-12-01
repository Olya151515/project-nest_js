import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BuyerEntity } from './buyer.entity';
import { CarBrandsEntity } from './car-brands.entity';
import { CarImageEntity } from './car-image.entity';
import { CarModelEntity } from './car-model.entity';
import { AddStatusEnum } from './enums/add-status.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { SellerEntity } from './seller.entity';

@Entity(TableNameEnum.ADVERTISEMENT)
export class AdvertisementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ default: AddStatusEnum.INACTIVE })
  status: string;

  @Column({ default: 0 })
  editAttempts: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  seller_id: string;
  @ManyToOne(() => SellerEntity, (seller) => seller.advertisements)
  @JoinColumn({ name: 'seller_id' })
  seller: SellerEntity;

  @ManyToMany(() => BuyerEntity, (buyer) => buyer.favoriteAds, {
    onDelete: 'CASCADE',
  })
  favoriteBuyers: BuyerEntity[];

  @OneToMany(() => CarImageEntity, (image) => image.advertisement)
  images?: CarImageEntity[];

  @ManyToOne(() => CarBrandsEntity, (brand) => brand.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'brand_id' })
  brand: CarBrandsEntity;

  @ManyToOne(() => CarModelEntity, (model) => model.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'model_id' })
  model: CarModelEntity;
}
