import { AdminEntity } from '../../../database/entities/admin.entity';
import {
  EntitiesALl,
  EntitiesEnum,
} from '../../../database/entities/enums/entities.enum';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { BaseAdminResDto } from '../models/dto/res/base-admin.res.dto';

export class AdminMapper {
  public static toResDto(user: AdminEntity): BaseAdminResDto {
    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      role: user.role,
      role_scope: user.role_scope,
    };
  }

  public static toIAdminData(
    user: AdminEntity,
    payload: IJwtPayload,
  ): Partial<IUserData> {
    return {
      user_id: user.id,
      email: user.email,
      role_name: user.role,
    };
  }
  public static toIUserData(
    user: EntitiesALl,
    payload: IJwtPayload,
  ): IUserData {
    return {
      user_id: user.entity.id,
      email: user.entity.email,
      role_name: user.entity.role,
      deviceId: payload.deviceId,
    };
  }
}
