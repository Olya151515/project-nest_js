import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ModelUpdateReqDto } from './models/dto/req/brand/model-update.req.dto';
import { ModelResDto } from './models/dto/res/brand/model.res.dto';
import { UpdatedModelResDto } from './models/dto/res/brand/updated-model.res.dto';
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
  @Patch(':modelId')
  public async updateModel(
    @Param('modelId') modelId: string,
    @Body() dto: ModelUpdateReqDto,
  ): Promise<UpdatedModelResDto> {
    return await this.modelsService.updateModel(modelId, dto);
  }

  @Delete(':modelId')
  public async deleteModel(@Param('modelId') modelId: string): Promise<void> {
    return await this.modelsService.deleteModel(modelId);
  }
}
