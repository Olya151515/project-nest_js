import { Module } from '@nestjs/common';

import { BuyerController } from './buyer.controller';
import { BuyerService } from './service/buyer.service';

@Module({
  imports: [],
  controllers: [BuyerController],
  providers: [BuyerService],
  exports: [],
})
export class BuyerModule {}
