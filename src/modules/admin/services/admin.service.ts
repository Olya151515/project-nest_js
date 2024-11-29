import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { IUserData } from '../../auth/models/interfaces/user-data';
import { AuthService } from '../../auth/services/auth.service';
import { AdminRepository } from '../../repository/services/admin.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { UpdateAdminReqDto } from '../models/dto/req/update-admin.req.dto';
import { AdminResDto } from '../models/dto/res/admin.res.dto';
import { BaseAdminResDto } from '../models/dto/res/base-admin.res.dto';
import { AdminMapper } from './admin.mapper';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  @Get('me')
  public async getMe(userData: IUserData): Promise<AdminResDto> {
    const admin = await this.adminRepository.findMe(userData.user_id);
    return AdminMapper.toResDto(admin);
  }
  public async updateMe(
    userData: IUserData,
    dto: UpdateAdminReqDto,
  ): Promise<BaseAdminResDto> {
    const admin = await this.adminRepository.findOneBy({
      id: userData.user_id,
    });
    if (!admin) {
      throw new NotFoundException('Admin does not exist');
    }
    this.adminRepository.merge(admin, { ...dto });
    const updatedAdmin = await this.adminRepository.save(admin);
    return AdminMapper.toBaseResDto(updatedAdmin);
  }
}
