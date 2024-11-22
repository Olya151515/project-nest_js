import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdvertisementID } from '../../common/types/entity-ids.type';
import { AnnouncementStatus } from './enums/announcement-status.enum';

@Entity('announcement')
export class AnnouncementEntity {
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

  // @Column({ type: 'enum', enum: AnnouncementStatus })
  // status: AnnouncementStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
