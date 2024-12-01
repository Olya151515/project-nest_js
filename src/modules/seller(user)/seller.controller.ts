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
import { AccountEnum } from '../../database/entities/enums/account-enum';
import { RoleEnum } from '../../database/entities/enums/role-enum';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { UserBanReqDto } from '../buyer/models/dto/req/user-ban.req.dto';
import { UpdateSellerReqDto } from './models/dto/req/update-seller.req.dto';
import { BaseSellerResDto } from './models/dto/res/base-seller.res.dto';
import { SellerResDto } from './models/dto/res/seller.res.dto';
import { SellerService } from './services/seller.service';

@ApiBearerAuth()
@ApiTags('seller')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
  @Roles([RoleEnum.SELLER])
  @Get('me')
  public async getMe(
    @CurrentUser() usersData: IUserData,
  ): Promise<SellerResDto> {
    return await this.sellerService.getMe(usersData);
  }

  @Roles([RoleEnum.SELLER])
  @Post('changeAccountType')
  public async changeAccountTYpe(
    @CurrentUser() userData: IUserData,
  ): Promise<BaseSellerResDto> {
    const now = new Date();
    const premiumExpiry = new Date(now.setMonth(now.getMonth() + 1));
    return await this.sellerService.changeAccountType(
      userData.user_id,
      AccountEnum.PREMIUM,
      premiumExpiry,
    );
  }

  @Roles([RoleEnum.SELLER])
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateSellerReqDto,
  ): Promise<BaseSellerResDto> {
    return await this.sellerService.updateMe(userData, dto);
  }

  @Roles([RoleEnum.MANAGER])
  @Delete(':sellerId')
  public async blockSeller(
    @CurrentUser() useData: IUserData,
    @Param('sellerId') sellerId: string,
    @Body() dto: UserBanReqDto,
  ): Promise<void> {
    await this.sellerService.banSeller(useData, sellerId, dto);
  }
}
