import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ModelResDto } from './models/dto/res/brand/model.res.dto';
import { CarModelService } from './services/car-model.service';

@ApiBearerAuth()
@ApiTags('models')
@Controller('models')
export class CarModelController {
  constructor(private readonly modelsService: CarModelService) {}

  @Get('model')
  public async getModel(): Promise<ModelResDto[]> {
    return await this.modelsService.getAll();
  }

  @Delete(':modelId')
  public async deleteModel(@Param('modelId') modelId: string): Promise<void> {
    return await this.modelsService.deleteModel(modelId);
  }
}
