import { CarBrandsEntity } from '../../../database/entities/car-brands.entity';
import { CarModelEntity } from '../../../database/entities/car-model.entity';
import { BrandResDto } from '../models/dto/res/brand/brand.res.dto';
import { ModelResDto } from '../models/dto/res/brand/model.res.dto';
import { ShortBrandResDto } from '../models/dto/res/brand/short-brand.res.dto';
import { ShortModelResDto } from '../models/dto/res/brand/short-model.res.dto';
import { UpdatedModelResDto } from '../models/dto/res/brand/updated-model.res.dto';

export class BrandMapper {
  public static toBrandResDto(brand: CarBrandsEntity): BrandResDto {
    return {
      id: brand.id,
      name: brand.name,
      models: brand.models
        ? brand.models.map((model) => this.toShortModelResDto(model))
        : null,
    };
  }
  public static toShortBrandDto(brand: CarBrandsEntity): ShortBrandResDto {
    return {
      id: brand.id,
      name: brand.name,
    };
  }
  public static toModelResDto(model: CarModelEntity): ModelResDto {
    return {
      id: model.id,
      name: model.name,
      year: model.year,
      brand: model.brand ? this.toShortBrandDto(model.brand) : null,
    };
  }
  public static toUpdateModelResDto(model: CarModelEntity): UpdatedModelResDto {
    return {
      id: model.id,
      name: model.name,
      year: model.year,
    };
  }
  public static toShortModelResDto(model: CarModelEntity): ShortModelResDto {
    return {
      id: model.id,
      name: model.name,
      year: model.year,
    };
  }
}
