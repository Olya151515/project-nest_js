import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CarModelEntity } from './car-model.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.CAR_BRANDS)
export class CarBrandsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => CarModelEntity, (model) => model.brand)
  models: CarModelEntity[];
}
