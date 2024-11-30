import { Module } from '@nestjs/common';

import { SellerController } from './seller.controller';
import { AccountService } from './services/account.service';
import { SellerService } from './services/seller.service';

@Module({
  imports: [],
  controllers: [SellerController],
  providers: [SellerService, AccountService],
  exports: [SellerService],
})
export class SellerModule {}
