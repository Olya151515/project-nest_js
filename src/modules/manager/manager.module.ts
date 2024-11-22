import { Module } from '@nestjs/common';

import { ManagerController } from './manager.controller';
import { ManagerService } from './services/manager.service';

@Module({
  imports: [],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
