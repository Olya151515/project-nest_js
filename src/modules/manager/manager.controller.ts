import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ManagerService } from './services/manager.service';

@ApiTags('manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @Get('me')
  public async getManager() {}
}
