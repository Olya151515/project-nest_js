import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RoleGuard } from '../../common/guard/role-guard';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './service/buyer.service';

@Module({
  imports: [],
  controllers: [BuyerController],
  providers: [
    BuyerService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [],
})
export class BuyerModule {}
