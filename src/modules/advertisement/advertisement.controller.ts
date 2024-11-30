import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AdvertisementID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { BaseAddReqDto } from './models/dto/req/base-add.req.dto';
import { UpdateAddReqDto } from './models/dto/req/update-add.req.dto';
import { AddResDto } from './models/dto/res/add.res.dto';
import { BaseAdsResDto } from './models/dto/res/base-ads.res.dto';
import { AdvertisementService } from './services/advertisement.service';

@ApiBearerAuth()
@ApiTags('advertisement')
@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post('advertisement')
  public async createAdvertisement(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseAddReqDto,
  ): Promise<AddResDto> {
    return await this.advertisementService.createAdd(userData, dto);
  }

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
    @CurrentUser() userData: IUserData,
    @Param('advertisementId', ParseUUIDPipe) advertisementId: AdvertisementID,
    @Body() dto: UpdateAddReqDto,
  ): Promise<AddResDto> {
    return await this.advertisementService.updateAdd(
      userData,
      advertisementId,
      dto,
    );
  }
}
