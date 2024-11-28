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

import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { BaseManagerReqDto } from '../manager/models/dto/req/manager/base-manager.req.dto';
import { AllManagersResDto } from '../manager/models/dto/res/manager/all-managers.res.dto';
import { BaseManagerResDto } from '../manager/models/dto/res/manager/base-manager.res.dto';
import { AdminService } from './services/admin.service';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('managers')
  public async getAllManagers(
    @CurrentUser() userData: IUserData,
  ): Promise<AllManagersResDto[]> {
    return await this.adminService.getAll(userData);
  }
  @Post('manager')
  public async createManager(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseManagerReqDto,
  ): Promise<BaseManagerResDto> {
    return await this.adminService.createManager(userData, dto);
  }
  @Delete(':managerId')
  public async deleteManager(
    @CurrentUser() userData: IUserData,
    @Param('managerId', ParseUUIDPipe) managerId: string,
  ): Promise<void> {
    return await this.adminService.deleteManager(userData, managerId);
  }
}
