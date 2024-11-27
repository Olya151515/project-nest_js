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
import { RoleReqDto } from './models/dto/req/role/role.req.dto';
import { UpdateRoleReqDto } from './models/dto/req/role/update-role.req.dto';
import { PermissionResDto } from './models/dto/res/permissions/permission-res.dto';
import { RoleResDto } from './models/dto/res/role/role.res.dto';
import { AdminService } from './services/admin.service';
import { RoleMapper } from './services/role.mapper';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('role')
  public async createRole(
    @CurrentUser() userData: IUserData,
    @Body() dto: RoleReqDto,
  ): Promise<RoleResDto> {
    const result = await this.adminService.createRole(dto, userData);
    return RoleMapper.toResDto(result);
  }
  @Get('role')
  public async getAllRole(
    @CurrentUser() userData: IUserData,
  ): Promise<RoleResDto[]> {
    return await this.adminService.getAllRoles(userData);
  }
  @Delete(':roleId')
  public async deleteRole(
    @CurrentUser() userData: IUserData,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ): Promise<void> {
    return await this.adminService.deleteRole(roleId, userData);
  }
  @Patch(':roleId')
  public async updateRole(
    @CurrentUser() userData: IUserData,
    @Param('roleId', ParseUUIDPipe) roleId: string,
    @Body() updateRoleDto: UpdateRoleReqDto,
  ): Promise<RoleResDto> {
    return await this.adminService.updateRole(userData, roleId, updateRoleDto);
  }
  @Get('permission')
  public async getAllPermissions(): Promise<PermissionResDto[]> {
    return await this.adminService.getPermissions();
  }
  @Delete(':permissionId')
  public async deletePermission(
    @CurrentUser() userData: IUserData,
    @Param('permissionId', ParseUUIDPipe) permissionId: string,
  ): Promise<void> {
    return await this.adminService.deletePermission(permissionId, userData);
  }
  @Get('managers')
  public async getAllManagers() {}
  @Post('manager')
  public async createManager() {}
  @Delete(':managerId')
  public async deleteManager(
    @Param('managerId', ParseUUIDPipe) managerId: string,
  ) {}
  @Patch(':managerId')
  public async updateManager(
    @Param('managerId', ParseUUIDPipe) managerId: string,
  ) {}
}
