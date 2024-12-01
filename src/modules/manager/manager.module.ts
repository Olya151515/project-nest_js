import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RoleGuard } from '../../common/guard/role-guard';
import { AuthModule } from '../auth/auth.module';
import { CarBrandController } from './car-brand.controller';
import { CarModelController } from './car-model.controller';
import { ManagerController } from './manager.controller';
import { CarBrandService } from './services/car-brand.service';
import { CarModelService } from './services/car-model.service';
import { ManagerService } from './services/manager.service';

@Module({
  imports: [AuthModule],
  controllers: [ManagerController, CarBrandController, CarModelController],
  providers: [
    ManagerService,
    CarBrandService,
    CarModelService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [ManagerService],
})
export class ManagerModule {}
