import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { IUserData } from '../auth/models/interfaces/user-data';
import { BuyerResDto } from './models/dto/res/buyer.res.dto';
import { BuyerService } from './service/buyer.service';

@ApiBearerAuth()
@ApiTags('buyer')
@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}
  @Get('me')
  public async getBuyer(
    @CurrentUser() userData: IUserData,
  ): Promise<BuyerResDto> {
    return await this.buyerService.getMe(userData);
  }
}
