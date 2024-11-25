import { ConflictException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';

import { PermissionEntity } from '../../../database/entities/permissions.entity';
import { RoleEntity } from '../../../database/entities/role.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { RoleRepository } from '../../repository/services/role.repository';
import { RoleReqDto } from '../models/dto/req/role/role.req.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly roleRepository: RoleRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async createRole(
    dto: RoleReqDto,
    userData: IUserData,
  ): Promise<RoleEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const roleRepository = manager.getRepository(RoleEntity);

      const permissions = await this.createPermissions(
        dto.permissions,
        manager,
        userData,
      );
      const existRole = await roleRepository.findOneBy({ name: dto.name });
      if (existRole) {
        throw new ConflictException('Role is already exists');
      }
      return await roleRepository.save(
        roleRepository.create({
          ...dto,
          permissions,
          admin_id: userData.user_id,
        }),
      );
    });
  }

  public async createPermissions(
    permissions: string[],
    manager: EntityManager,
    userData: IUserData,
  ): Promise<PermissionEntity[]> {
    if (!permissions || !permissions.length) return [];
    const permissionRepository = manager.getRepository(PermissionEntity);
    const entities = await permissionRepository.findBy({
      action: In(permissions),
    });
    const existingPermission = entities.map((permission) => permission.action);
    const newPermissions = permissions.filter(
      (permission) => !existingPermission.includes(permission),
    );
    const newEntities = await permissionRepository.save(
      newPermissions.map((permission) =>
        permissionRepository.create({
          action: permission,
          admin_id: userData.user_id,
        }),
      ),
    );
    return [...entities, ...newEntities];
  }
}
