import {
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdvertisementID, SellerID } from '../../common/types/entity-ids.type';
import { ManagerService } from './services/manager.service';

@ApiTags('manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @Delete(':sellerId')
  public async deleteUserById(
    @Param('sellerId', ParseUUIDPipe) sellerId: SellerID,
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
