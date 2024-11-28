import { ConflictException, Injectable } from '@nestjs/common';

import { CarModelsRepository } from '../../repository/services/car-models.repository';
import { ModelResDto } from '../models/dto/res/brand/model.res.dto';
import { BrandMapper } from './brand.mapper';

@Injectable()
export class CarModelService {
  constructor(private readonly modelRepository: CarModelsRepository) {}

  public async getAll(): Promise<ModelResDto[]> {
    const models = await this.modelRepository.findAll();
    return models.map((model) => BrandMapper.toModelResDto(model));
  }
  public async deleteModel(modelId: string): Promise<void> {
    const model = await this.modelRepository.findOneBy({ id: modelId });
    if (!model) {
      throw new ConflictException('Model does nor exist');
    }
    await this.modelRepository.remove(model);
  }
}
