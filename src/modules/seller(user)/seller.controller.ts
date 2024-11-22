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
import { SellerService } from './services/seller.service';

@ApiTags('seller')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
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
