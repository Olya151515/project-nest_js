import { CarBrandsEntity } from '../../../database/entities/car-brands.entity';
import { CarModelEntity } from '../../../database/entities/car-model.entity';
import { BrandResDto } from '../models/dto/res/brand/brand.res.dto';
import { ModelResDto } from '../models/dto/res/brand/model.res.dto';

export class BrandMapper {
  public static toBrandResDto(brand: CarBrandsEntity): BrandResDto {
    return {
      id: brand.id,
      name: brand.name,
      models: brand.models ? brand.models.map((model) => model) : null,
    };
  }
  public static toModelResDto(model: CarModelEntity): ModelResDto {
    return {
      id: model.id,
      name: model.name,
      year: model.year,
      brand: model.brand ? model.brand : null,
    };
  }
}
