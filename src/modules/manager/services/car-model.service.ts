import { Injectable, NotFoundException } from '@nestjs/common';

import { CarModelsRepository } from '../../repository/services/car-models.repository';
import { ModelUpdateReqDto } from '../models/dto/req/brand/model-update.req.dto';
import { ModelResDto } from '../models/dto/res/brand/model.res.dto';
import { UpdatedModelResDto } from '../models/dto/res/brand/updated-model.res.dto';
import { BrandMapper } from './brand.mapper';

@Injectable()
export class CarModelService {
  constructor(private readonly modelRepository: CarModelsRepository) {}

  public async getAll(): Promise<ModelResDto[]> {
    const models = await this.modelRepository.findAll();
    return models.map((model) => BrandMapper.toModelResDto(model));
  }
  public async updateModel(
    modelId: string,
    dto: ModelUpdateReqDto,
  ): Promise<UpdatedModelResDto> {
    const model = await this.modelRepository.findOneBy({ id: modelId });
    if (!model) {
      throw new NotFoundException('Model does not exist');
    }

    const newModel = this.modelRepository.merge(model, dto, model.brand);
    const updatedModel = await this.modelRepository.save(newModel);
    return BrandMapper.toUpdateModelResDto(updatedModel);
  }
  public async deleteModel(modelId: string): Promise<void> {
    const model = await this.modelRepository.findOneBy({ id: modelId });
    if (!model) {
      throw new NotFoundException('Model does nor exist');
    }
    await this.modelRepository.remove(model);
  }
}
