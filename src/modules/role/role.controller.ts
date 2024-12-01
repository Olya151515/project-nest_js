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

import { Roles } from '../../common/decorators/role-decorator';
import { RoleEnum } from '../../database/entities/enums/role-enum';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { RoleReqDto } from './models/dto/req/role/role.req.dto';
import { UpdateRoleReqDto } from './models/dto/req/role/update-role.req.dto';
import { RoleResDto } from './models/dto/res/role/role.res.dto';
import { RoleMapper } from './service/role.mapper';
import { RoleService } from './service/role.service';

@ApiBearerAuth()
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles([RoleEnum.ADMIN])
  @Post('role')
  public async createRole(
    @CurrentUser() userData: IUserData,
    @Body() dto: RoleReqDto,
  ): Promise<RoleResDto> {
    const result = await this.roleService.createRole(dto, userData);
    return RoleMapper.toResDto(result);
  }

  @Roles([RoleEnum.ADMIN])
  @Get('role')
  public async getAllRole(
    @CurrentUser() userData: IUserData,
  ): Promise<RoleResDto[]> {
    return await this.roleService.getAllRoles(userData);
  }

  @Roles([RoleEnum.ADMIN])
  @Delete(':roleId')
  public async deleteRole(
    @CurrentUser() userData: IUserData,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ): Promise<void> {
    return await this.roleService.deleteRole(roleId, userData);
  }

  @Roles([RoleEnum.ADMIN])
  @Patch(':roleId')
  public async updateRole(
    @CurrentUser() userData: IUserData,
    @Param('roleId', ParseUUIDPipe) roleId: string,
    @Body() updateRoleDto: UpdateRoleReqDto,
  ): Promise<RoleResDto> {
    return await this.roleService.updateRole(userData, roleId, updateRoleDto);
  }
}
