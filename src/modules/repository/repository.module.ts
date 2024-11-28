import { Global, Module } from '@nestjs/common';

import { AdminRepository } from './services/admin.repository';
import { AdvertisementRepository } from './services/advertisement.repository';
import { BuyersRepository } from './services/buyers.repository';
import { CarBrandsRepository } from './services/car-brands.repository';
import { CarModelsRepository } from './services/car-models.repository';
import { ManagersRepository } from './services/managers.repository';
import { PermissionRepository } from './services/permission.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { RoleRepository } from './services/role.repository';
import { SellersRepository } from './services/sellers.repository';
import { UsersRepository } from './services/users.repository';

const repositories = [
  AdminRepository,
  AdvertisementRepository,
  BuyersRepository,
  ManagersRepository,
  PermissionRepository,
  RefreshTokenRepository,
  RoleRepository,
  SellersRepository,
  UsersRepository,
  CarBrandsRepository,
  CarModelsRepository,
];
@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
