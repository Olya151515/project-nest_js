import { ConflictException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';

import { PermissionEntity } from '../../../database/entities/permissions.entity';
import { RoleEntity } from '../../../database/entities/role.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { AdminRepository } from '../../repository/services/admin.repository';
import { PermissionRepository } from '../../repository/services/permission.repository';
import { RoleRepository } from '../../repository/services/role.repository';
import { RoleReqDto } from '../models/dto/req/role/role.req.dto';
import { UpdateRoleReqDto } from '../models/dto/req/role/update-role.req.dto';
import { PermissionResDto } from '../models/dto/res/permissions/permission-res.dto';
import { RoleResDto } from '../models/dto/res/role/role.res.dto';
import { RoleMapper } from './role.mapper';

@Injectable()
export class AdminService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly adminRepository: AdminRepository,
    private readonly permissionRepository: PermissionRepository,
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
        userData,
        manager,
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

  public async getAllRoles(userData: IUserData): Promise<RoleResDto[]> {
    const admin = await this.adminRepository.findOneBy({
      email: userData.email,
    });
    if (!admin) {
      throw new ConflictException('You are not admin');
    }
    const roles = await this.roleRepository.findAll(userData);
    if (roles.length === 0) {
      throw new ConflictException('You do not create any roles');
    }
    return roles.map((role) => RoleMapper.toResDto(role));
  }

  public async deleteRole(roleId: string, userData: IUserData): Promise<void> {
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) {
      throw new ConflictException('Role does not exist');
    }
    const isAdmin = role.admin_id === userData.user_id;
    if (!isAdmin) {
      throw new ConflictException(
        'You can not delete this role , because  you do not create that ',
      );
    }
    await this.roleRepository.delete({ id: roleId });
  }
  public async updateRole(
    userData: IUserData,
    roleId: string,
    updateDto: UpdateRoleReqDto,
  ): Promise<RoleResDto> {
    const role = await this.roleRepository.findOneBy({ id: roleId });

    if (!role) {
      throw new ConflictException('Role does not exist');
    }
    if (!(role.admin_id === userData.user_id)) {
      throw new ConflictException(
        'You can not update this role , because you do not create that',
      );
    }
    let permissions: PermissionEntity[] = [];
    if (updateDto.permissions) {
      permissions = await this.createPermissions(
        updateDto.permissions,
        userData,
      );
    }
    this.roleRepository.merge(role, { ...updateDto, permissions });
    await this.roleRepository.save(role);

    return RoleMapper.toResDto(role);
  }

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
  public async createPermissions(
    permissions: string[],
    userData: IUserData,
    manager?: EntityManager,
  ): Promise<PermissionEntity[]> {
    if (!permissions || !permissions.length) return [];
    const repo = manager
      ? manager.getRepository(PermissionEntity)
      : this.permissionRepository;
    const entities = await repo.findBy({
      action: In(permissions),
    });
    const existingPermission = entities.map((permission) => permission.action);
    const newPermissions = permissions.filter(
      (permission) => !existingPermission.includes(permission),
    );
    const newEntities = await repo.save(
      newPermissions.map((permission) =>
        repo.create({
          action: permission,
          admin_id: userData.user_id,
        }),
      ),
    );
    return [...entities, ...newEntities];
  }
}
