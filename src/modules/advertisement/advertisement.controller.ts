import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdvertisementID } from '../../common/types/entity-ids.type';
import { AdvertisementService } from './services/advertisement.service';

@ApiTags('advertisement')
@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post('advertisement')
  public async createAdvertisement() {}
  @Get('advertisements')
  public async getAll() {}
  @Get(':advertisementId')
  public async getAdvertisementById(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: AdvertisementID,
  ) {}
  @Delete(':advertisementId')
  public async deleteAdvertisement(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: AdvertisementID,
  ) {}
  @Patch(':advertisementId')
  public async updateAdvertisement(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: AdvertisementID,
  ) {}
}
