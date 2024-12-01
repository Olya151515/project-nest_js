import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/role-decorator';
import { RoleEnum } from '../../database/entities/enums/role-enum';
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

  @Roles([RoleEnum.ADMIN])
  @Get('me')
  public async getMe(@CurrentUser() userData: IUserData): Promise<AdminResDto> {
    return await this.adminService.getMe(userData);
  }

  @Roles([RoleEnum.ADMIN])
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateAdminReqDto,
  ): Promise<BaseAdminResDto> {
    return await this.adminService.updateMe(userData, dto);
  }
}
