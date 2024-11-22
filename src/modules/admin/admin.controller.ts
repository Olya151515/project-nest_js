import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  ManagerID,
  PermissionID,
  RoleID,
} from '../../common/types/entity-ids.type';
import { AdminService } from './services/admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('role')
  public async getAllRole() {}
  @Post('role')
  public async createRole() {}
  @Delete(':roleId')
  public async deleteRole(@Param('roleId', ParseUUIDPipe) roleId: RoleID) {}
  @Patch(':roleId')
  public async updateRole(@Param('roleId', ParseUUIDPipe) roleId: RoleID) {}
  @Get('permission')
  public async getAllPermissions() {}
  @Post('permission')
  public async createPermission() {}
  @Delete(':permissionId')
  public async deletePermission(
    @Param('permissionId', ParseUUIDPipe) permissionId: PermissionID,
  ) {}
  @Patch(':permissionId')
  public async updatePermission(
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
