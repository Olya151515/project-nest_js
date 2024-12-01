import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RoleGuard } from '../../common/guard/role-guard';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './services/advertisement.service';

@Module({
  imports: [],
  controllers: [AdvertisementController],
  providers: [
    AdvertisementService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [AdvertisementService],
})
export class AdvertisementModule {}
