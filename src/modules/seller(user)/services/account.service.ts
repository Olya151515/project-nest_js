import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AccountEnum } from '../../../database/entities/enums/account-enum';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { SellerService } from './seller.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly sellerRepository: SellersRepository,
    private readonly sellerService: SellerService,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Виконується щодня опівночі
  public async changeAccountTypeOnBase() {
    const now = new Date();

    const expiredSellers =
      await this.sellerService.findExpiredPremiumAccounts(now);

    expiredSellers.map((seller) => {
      this.sellerService.changeAccountType(seller.id, AccountEnum.BASE, null);
      console.log(`Змінено тип акаунту користувача ${seller.id} на "basic"`);
    });
  }
}
