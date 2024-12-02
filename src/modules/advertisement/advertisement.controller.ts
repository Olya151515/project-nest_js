import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { Roles } from '../../common/decorators/role-decorator';
import { RoleEnum } from '../../database/entities/enums/role-enum';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { AddQueryListReqDto } from './models/dto/req/add-query-list.req.dto';
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

  @Roles([RoleEnum.SELLER])
  @Post('advertisement')
  public async createAdvertisement(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseAddReqDto,
  ): Promise<AddResDto> {
    return await this.advertisementService.createAdd(userData, dto);
  }

  @Get('advertisements')
  public async getAll(
    @Query() query: AddQueryListReqDto,
  ): Promise<BaseAdsResDto[]> {
    return await this.advertisementService.getAllAdds(query);
  }

  @Roles([RoleEnum.SELLER])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('car-images', 15))
  @ApiFile('car-images', true, true)
  @Post('image/:advertisementId')
  public async postVarImage(
    @CurrentUser() userData: IUserData,
    @Param('advertisementId') advertisementId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void> {
    return await this.advertisementService.uploadCArImages(
      userData,
      files,
      advertisementId,
    );
  }

  @Get(':advertisementId')
  public async getAdvertisementById(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
  ): Promise<BaseAdsResDto> {
    return await this.advertisementService.getById(advertisementId);
  }

  @Roles([RoleEnum.SELLER, RoleEnum.MANAGER])
  @Delete(':advertisementId')
  public async deleteAdvertisement(
    @CurrentUser() userData: IUserData,
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
  ): Promise<void> {
    return await this.advertisementService.deleteAdd(advertisementId, userData);
  }

  @Roles([RoleEnum.SELLER, RoleEnum.MANAGER])
  @Patch(':advertisementId')
  public async updateAdvertisement(
    @CurrentUser() userData: IUserData,
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
    @Body() dto: UpdateAddReqDto,
  ): Promise<AddResDto> {
    return await this.advertisementService.updateAdd(
      userData,
      advertisementId,
      dto,
    );
  }
}
