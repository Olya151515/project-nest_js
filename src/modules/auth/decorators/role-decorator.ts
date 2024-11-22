import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '../../../database/entities/enums/role-enum';
import { RoleEntity } from '../../../database/entities/role.entity';

export const ROLES_KEY = 'roles';

export const Roles = (roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
