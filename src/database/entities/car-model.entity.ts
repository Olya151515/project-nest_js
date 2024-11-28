import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarBrandsEntity } from './car-brands.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.CAR_MODELS)
export class CarModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  year?: number;

  @ManyToOne(() => CarBrandsEntity, (brand) => brand.models, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brand_id' })
  brand: CarBrandsEntity;
}
