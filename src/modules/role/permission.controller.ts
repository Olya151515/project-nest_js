import { Controller, Delete, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/role-decorator';
import { RoleEnum } from '../../database/entities/enums/role-enum';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { PermissionResDto } from './models/dto/res/permissions/permission-res.dto';
import { PermissionService } from './service/permission.service';

@ApiBearerAuth()
@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Roles([RoleEnum.ADMIN])
  @Get('permission')
  public async getAllPermissions(): Promise<PermissionResDto[]> {
    return await this.permissionService.getPermissions();
  }

  @Roles([RoleEnum.ADMIN])
  @Delete(':permissionId')
  public async deletePermission(
    @CurrentUser() userData: IUserData,
    @Param('permissionId', ParseUUIDPipe) permissionId: string,
  ): Promise<void> {
    return await this.permissionService.deletePermission(
      permissionId,
      userData,
    );
  }
}
