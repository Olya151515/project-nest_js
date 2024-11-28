import { ManagerEntity } from '../../../database/entities/manager.entity';
import { AdminMapper } from '../../admin/services/admin.mapper';
import { AllManagersResDto } from '../models/dto/res/manager/all-managers.res.dto';
import { BaseManagerResDto } from '../models/dto/res/manager/base-manager.res.dto';

export class ManagerMapper {
  public static toResDto(manager: ManagerEntity): BaseManagerResDto {
    return {
      id: manager.id,
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      role: manager.role,
      role_scope: manager.role_scope,
      department: manager.department,
      createdBy: manager.createdBy
        ? AdminMapper.toResDto(manager.createdBy)
        : null,
    };
  }
  public static toAllResDto(manager: ManagerEntity): AllManagersResDto {
    return {
      id: manager.id,
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      role: manager.role,
      role_scope: manager.role_scope,
      department: manager.department,
      createdBy: manager.createdBy
        ? AdminMapper.toResDto(manager.createdBy)
        : null,
      bannedBuyers: manager.bannedBuyers ? [] : null,
      bannedSellers: manager.bannedSellers ? [] : null,
    };
  }
}
