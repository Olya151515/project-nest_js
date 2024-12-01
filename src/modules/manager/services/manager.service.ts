import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';

import { ManagerEntity } from '../../../database/entities/manager.entity';
import { UsersEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { AuthService } from '../../auth/services/auth.service';
import { AdminRepository } from '../../repository/services/admin.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { BaseManagerReqDto } from '../models/dto/req/manager/base-manager.req.dto';
import { UpdateManagerReqDto } from '../models/dto/req/manager/update-manager.req.dto';
import { BaseManagerResDto } from '../models/dto/res/manager/base-manager.res.dto';
import { ManagerMapper } from './manager.mapper';

@Injectable()
export class ManagerService {
  constructor(
    private readonly managerRepository: ManagersRepository,
    private readonly authService: AuthService,
    private readonly adminRepository: AdminRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async getMe(userData: IUserData): Promise<ManagerEntity> {
    return await this.managerRepository.findMe(userData.user_id);
  }

  public async getAll(userData: IUserData): Promise<BaseManagerResDto[]> {
    const managers = await this.managerRepository.findAll(userData);
    return managers.map((manager) => ManagerMapper.toBaseResDto(manager));
  }
  public async getManagerById(
    managerId: string,
    userData: IUserData,
  ): Promise<BaseManagerResDto> {
    const manager = await this.managerRepository.findOneManager(
      managerId,
      userData,
    );
    if (!manager) {
      throw new NotFoundException('Manager does not exist');
    }
    return ManagerMapper.toBaseResDto(manager);
  }

  public async createManager(
    userData: IUserData,
    dto: BaseManagerReqDto,
  ): Promise<BaseManagerResDto> {
    await this.authService.isEmailNotExistOrThrow(dto.email);
    const role = await this.authService.checkRoleExist(
      dto.role,
      dto.role_scope,
    );
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const admin = await this.adminRepository.findOneBy({
      id: userData.user_id,
    });
    const manager = await this.managerRepository.save(
      this.managerRepository.create({
        ...dto,
        role: dto.role,
        password: passwordHash,
        createdBy: admin,
      }),
    );

    await this.authService.saveUser({ entity: manager }, passwordHash, role);
    await this.authService.generateAndSaveTokens(
      manager.id,
      manager.role,
      dto.deviceId,
    );

    return ManagerMapper.toBaseResDto(manager);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateManagerReqDto,
  ): Promise<BaseManagerResDto> {
    const manager = await this.managerRepository.findOneBy({
      id: userData.user_id,
    });
    if (!manager) {
      throw new ConflictException('Manager does not exist');
    }
    this.managerRepository.merge(manager, { ...dto });
    const updatedManager = await this.managerRepository.save(manager);
    return ManagerMapper.toBaseResDto(updatedManager);
  }

  public async deleteManager(
    userData: IUserData,
    managerId: string,
  ): Promise<void> {
    const admin = await this.adminRepository.findOneBy({
      id: userData.user_id,
    });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const manager = await this.managerRepository.findOneBy({ id: managerId });
    if (!manager) {
      throw new ConflictException('Manager does not exist');
    }
    if (admin?.id !== manager.admin_id) {
      throw new ConflictException(
        'You can not delete , you do not create that manager',
      );
    }
    await this.entityManager.transaction(async (em) => {
      const managerRepository = em.getRepository(ManagerEntity);
      const usersRepository = em.getRepository(UsersEntity);
      await Promise.any([
        await managerRepository.delete(manager.id),
        await usersRepository.delete({ user_id: manager.id }),
      ]);
    });
  }
}
