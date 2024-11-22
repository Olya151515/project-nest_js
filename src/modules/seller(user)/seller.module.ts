import { Module } from '@nestjs/common';

import { SellerController } from './seller.controller';
import { SellerService } from './services/seller.service';

@Module({
  imports: [],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule {}
