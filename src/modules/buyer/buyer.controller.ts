import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/role-decorator';
import { RoleEnum } from '../../database/entities/enums/role-enum';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { UpdatedBuyerReqDto } from './models/dto/req/updated-buyer.req.dto';
import { UserBanReqDto } from './models/dto/req/user-ban.req.dto';
import { BuyerResDto } from './models/dto/res/buyer.res.dto';
import { UpdatedBuyerResDto } from './models/dto/res/updated-buyer.res.dto';
import { BuyerService } from './service/buyer.service';

@ApiBearerAuth()
@ApiTags('buyer')
@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}
  @Roles([RoleEnum.BUYER])
  @Get('me')
  public async getBuyer(
    @CurrentUser() userData: IUserData,
  ): Promise<BuyerResDto> {
    return await this.buyerService.getMe(userData);
  }
  @Roles([RoleEnum.BUYER])
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdatedBuyerReqDto,
  ): Promise<UpdatedBuyerResDto> {
    return await this.buyerService.updateMe(userData, dto);
  }

  @Roles([RoleEnum.MANAGER])
  @Delete(':buyerId')
  public async BlockBuyer(
    @CurrentUser() userData: IUserData,
    @Param('buyerId') buyerId: string,
    @Body() dto: UserBanReqDto,
  ): Promise<void> {
    await this.buyerService.blockBuyer(userData, buyerId, dto);
  }

  @Roles([RoleEnum.BUYER])
  @Post('favorite/:advertisementId')
  public async favoriteAdd(
    @CurrentUser() userData: IUserData,
    @Param('advertisementId') advertisementId: string,
  ): Promise<BuyerResDto> {
    return await this.buyerService.favoriteAdd(advertisementId, userData);
  }

  @Roles([RoleEnum.BUYER])
  @Delete('favorite/:advertisementId')
  public async deleteFavoriteAdd(
    @CurrentUser() userData: IUserData,
    @Param('advertisementId') advertisementId: string,
  ): Promise<BuyerResDto> {
    return await this.buyerService.deleteFavoriteAdd(userData, advertisementId);
  }
}
