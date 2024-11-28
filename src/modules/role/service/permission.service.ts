import { ConflictException, Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/models/interfaces/user-data';
import { PermissionRepository } from '../../repository/services/permission.repository';
import { PermissionResDto } from '../models/dto/res/permissions/permission-res.dto';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}
  public async getPermissions(): Promise<PermissionResDto[]> {
    return await this.permissionRepository.findAll();
  }

  public async deletePermission(
    permissionId: string,
    userData: IUserData,
  ): Promise<void> {
    const permission = await this.permissionRepository.findOneBy({
      id: permissionId,
    });
    if (!permission) {
      throw new ConflictException('Permission does not exist');
    }

    if (!(permission.admin_id === userData.user_id)) {
      throw new ConflictException(
        'You can not delete this permission , because you do not create that',
      );
    }

    await this.permissionRepository.remove(permission);
  }
}
