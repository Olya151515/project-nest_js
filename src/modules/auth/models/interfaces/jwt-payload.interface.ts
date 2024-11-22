import { RoleEnum } from '../../../../database/entities/enums/role-enum';
import { UserIdsEnum } from '../../../../database/entities/enums/userIds-enum';

export interface IJwtPayload {
  role: RoleEnum;
  userId: UserIdsEnum;
}
