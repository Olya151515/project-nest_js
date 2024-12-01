import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RoleGuard } from '../../common/guard/role-guard';
import { SellerController } from './seller.controller';
import { AccountService } from './services/account.service';
import { SellerService } from './services/seller.service';

@Module({
  imports: [],
  controllers: [SellerController],
  providers: [
    SellerService,
    AccountService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [SellerService],
})
export class SellerModule {}
