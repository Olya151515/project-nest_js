import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SellerService } from './services/seller.service';

@ApiTags('seller')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
  @Get('me')
  public async getMe() {}
}
