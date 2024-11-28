import { ConflictException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';

import { ManagerEntity } from '../../../database/entities/manager.entity';
import { UsersEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { AuthService } from '../../auth/services/auth.service';
import { BaseManagerReqDto } from '../../manager/models/dto/req/manager/base-manager.req.dto';
import { AllManagersResDto } from '../../manager/models/dto/res/manager/all-managers.res.dto';
import { BaseManagerResDto } from '../../manager/models/dto/res/manager/base-manager.res.dto';
import { ManagerMapper } from '../../manager/services/manager.mapper';
import { AdminRepository } from '../../repository/services/admin.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly managerRepository: ManagersRepository,
    private readonly authService: AuthService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async getAll(userData: IUserData): Promise<AllManagersResDto[]> {
    const managers = await this.managerRepository.findAll(userData);
    return managers.map((manager) => ManagerMapper.toAllResDto(manager));
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
        admin_id: admin.id,
      }),
    );

    await this.authService.saveUser({ entity: manager }, passwordHash, role);
    await this.authService.generateAndSaveTokens(
      manager.id,
      manager.role,
      dto.deviceId,
    );

    return ManagerMapper.toResDto(manager);
  }

  public async deleteManager(
    userData: IUserData,
    managerId: string,
  ): Promise<void> {
    const admin = await this.adminRepository.findOneBy({
      id: userData.user_id,
    });
    if (!admin) {
      throw new ConflictException('Admin not found');
    }
    const manager = await this.managerRepository.findOneBy({ id: managerId });
    if (!manager) {
      throw new ConflictException('Manager does not exist');
    }
    if (admin?.id !== manager?.admin_id) {
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
