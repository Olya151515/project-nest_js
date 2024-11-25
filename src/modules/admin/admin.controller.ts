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

import {
  ManagerID,
  PermissionID,
  RoleID,
} from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { RoleReqDto } from './models/dto/req/role/role.req.dto';
import { AdminService } from './services/admin.service';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('role')
  public async createRole(
    @CurrentUser() userData: IUserData,
    @Body() dto: RoleReqDto,
  ) {
    const result = await this.adminService.createRole(dto, userData);
  }
  @Get('role')
  public async getAllRole() {}
  @Delete(':roleId')
  public async deleteRole(@Param('roleId', ParseUUIDPipe) roleId: RoleID) {}
  @Patch(':roleId')
  public async updateRole(@Param('roleId', ParseUUIDPipe) roleId: RoleID) {}
  @Get('permission')
  public async getAllPermissions() {}
  @Delete(':permissionId')
  public async deletePermission(
    @Param('permissionId', ParseUUIDPipe) permissionId: PermissionID,
  ) {}
  @Get('managers')
  public async getAllManagers() {}
  @Post('manager')
  public async createManager() {}
  @Delete(':managerId')
  public async deleteManager(
    @Param('managerId', ParseUUIDPipe) managerId: ManagerID,
  ) {}
  @Patch(':managerId')
  public async updateManager(
    @Param('managerId', ParseUUIDPipe) managerId: ManagerID,
  ) {}
}
