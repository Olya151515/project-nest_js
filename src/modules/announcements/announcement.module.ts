import { Module } from '@nestjs/common';

import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './services/announcement.service';

@Module({
  imports: [],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
