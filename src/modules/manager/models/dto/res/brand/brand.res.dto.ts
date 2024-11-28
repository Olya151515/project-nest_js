import { CarModelEntity } from '../../../../../../database/entities/car-model.entity';

export class BrandResDto {
  id: string;
  name: string;
  models: CarModelEntity[];
}
