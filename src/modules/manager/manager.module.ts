import { Module } from '@nestjs/common';

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
  providers: [ManagerService, CarBrandService, CarModelService],
  exports: [ManagerService],
})
export class ManagerModule {}
