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
import { BaseManagerReqDto } from './models/dto/req/manager/base-manager.req.dto';
import { UpdateManagerReqDto } from './models/dto/req/manager/update-manager.req.dto';
import { BaseManagerResDto } from './models/dto/res/manager/base-manager.res.dto';
import { ManagerResDto } from './models/dto/res/manager/manager.res.dto';
import { ManagerMapper } from './services/manager.mapper';
import { ManagerService } from './services/manager.service';

@ApiBearerAuth()
@ApiTags('manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @Get('me')
  public async getManager(
    @CurrentUser() userData: IUserData,
  ): Promise<ManagerResDto> {
    const result = await this.managerService.getMe(userData);
    return ManagerMapper.toResDto(result);
  }

  @Post('manager')
  public async createManager(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseManagerReqDto,
  ): Promise<BaseManagerResDto> {
    return await this.managerService.createManager(userData, dto);
  }

  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateManagerReqDto,
  ): Promise<BaseManagerResDto> {
    return await this.managerService.updateMe(userData, dto);
  }
  @Delete(':managerId')
  public async deleteManager(
    @CurrentUser() userData: IUserData,
    @Param('managerId', ParseUUIDPipe) managerId: string,
  ): Promise<void> {
    return await this.managerService.deleteManager(userData, managerId);
  }

  @Get('managers')
  public async getAllManagers(
    @CurrentUser() userData: IUserData,
  ): Promise<BaseManagerResDto[]> {
    return await this.managerService.getAll(userData);
  }

  @Get(':managerId')
  public async getManagerById(
    @CurrentUser() userData: IUserData,
    @Param('managerId', ParseUUIDPipe) managerId: string,
  ): Promise<BaseManagerResDto> {
    return await this.managerService.getManagerById(managerId, userData);
  }
}
