import { CarBrandsEntity } from '../../../../../../database/entities/car-brands.entity';

export class ModelResDto {
  id: string;
  name: string;
  year: number;
  brand: CarBrandsEntity;
}
