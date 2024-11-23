import { Module } from '@nestjs/common';

import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './services/advertisement.service';

@Module({
  imports: [],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
  exports: [AdvertisementService],
})
export class AdvertisementModule {}
