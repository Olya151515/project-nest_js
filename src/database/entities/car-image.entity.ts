import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.CAR_IMAGES)
export class CarImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  advertisementId: string;
  @ManyToOne(
    () => AdvertisementEntity,
    (advertisement) => advertisement.images,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'advertisementId' })
  advertisement: AdvertisementEntity;
}
