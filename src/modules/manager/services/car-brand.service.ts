import { ConflictException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';

import { CarBrandsEntity } from '../../../database/entities/car-brands.entity';
import { CarModelEntity } from '../../../database/entities/car-model.entity';
import { CarBrandsRepository } from '../../repository/services/car-brands.repository';
import { CarModelsRepository } from '../../repository/services/car-models.repository';
import { BrandReqDto } from '../models/dto/req/brand/brand.req.dto';
import { ModelReqDto } from '../models/dto/req/brand/model.req.dto';
import { BrandResDto } from '../models/dto/res/brand/brand.res.dto';
import { BrandMapper } from './brand.mapper';

@Injectable()
export class CarBrandService {
  constructor(
    private readonly brandRepository: CarBrandsRepository,
    private readonly modelRepository: CarModelsRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  public async createBrand(dto: BrandReqDto): Promise<BrandResDto> {
    return await this.entityManager.transaction(async (manager) => {
      const brandRepository = manager.getRepository(CarBrandsEntity);
      //const models = dto.models.map((model) => model.name);
      const models = await this.createModels(dto.models, manager);
      const brandExist = await brandRepository.findOneBy({ name: dto.name });
      if (brandExist) {
        throw new ConflictException('Brand is already exist');
      }

      return await brandRepository.save(
        brandRepository.create({
          ...dto,
          models,
        }),
      );
    });
  }

  public async getAllBrands(): Promise<BrandResDto[]> {
    const brands = await this.brandRepository.findAll();
    return brands.map((brand) => BrandMapper.toBrandResDto(brand));
  }

  public async deleteBrand(brandId: string): Promise<void> {
    const brand = await this.brandRepository.findOneBy({ id: brandId });
    if (!brand) {
      throw new ConflictException('Brand does not exist');
    }
    await this.brandRepository.remove(brand);
  }

  private async createModels(
    models: ModelReqDto[],
    manager?: EntityManager,
  ): Promise<CarModelEntity[]> {
    if (!models || !models.length) return [];
    const repo = manager
      ? manager.getRepository(CarModelEntity)
      : this.modelRepository;

    const entities = await repo.findBy({
      name: In(models),
    });
    const existingModels = entities.map((models) => models.name);
    const newModels = models.filter(
      (model) => !existingModels.includes(model.name),
    );

    const newEntities = await repo.save(
      newModels.map((models) =>
        repo.create({
          name: models.name,
          year: models.year,
        }),
      ),
    );
    return [...entities, ...newEntities];
  }
}
