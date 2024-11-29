import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { UpdateAdminReqDto } from './models/dto/req/update-admin.req.dto';
import { AdminResDto } from './models/dto/res/admin.res.dto';
import { BaseAdminResDto } from './models/dto/res/base-admin.res.dto';
import { AdminService } from './services/admin.service';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('me')
  public async getMe(@CurrentUser() userData: IUserData): Promise<AdminResDto> {
    return await this.adminService.getMe(userData);
  }

  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateAdminReqDto,
  ): Promise<BaseAdminResDto> {
    return await this.adminService.updateMe(userData, dto);
    console.log(dto);
  }
}
