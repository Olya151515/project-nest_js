import { Injectable, NotFoundException } from '@nestjs/common';
import { LessThan } from 'typeorm';

import { AccountEnum } from '../../../database/entities/enums/account-enum';
import { SellerEntity } from '../../../database/entities/seller.entity';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { UserBanReqDto } from '../../buyer/models/dto/req/user-ban.req.dto';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { UpdateSellerReqDto } from '../models/dto/req/update-seller.req.dto';
import { BaseSellerResDto } from '../models/dto/res/base-seller.res.dto';
import { SellerResDto } from '../models/dto/res/seller.res.dto';
import { SellerMapper } from './seller.mapper';

@Injectable()
export class SellerService {
  constructor(
    private readonly sellerRepository: SellersRepository,
    private readonly managerRepository: ManagersRepository,
  ) {}

  public async findExpiredPremiumAccounts(
    currentDate: Date,
  ): Promise<SellerEntity[]> {
    return await this.sellerRepository.find({
      where: {
        accountType: 'premium',
        premiumExpiry: LessThan(currentDate),
      },
    });
  }

  public async changeAccountType(
    sellerId: string,
    accountType: AccountEnum,
    premiumExpiry: Date | null,
  ): Promise<BaseSellerResDto> {
    const seller = await this.isSellerExist(sellerId);
    this.sellerRepository.merge(seller, {
      accountType: accountType,
      premiumExpiry: premiumExpiry,
    });
    const updatedSeller = await this.sellerRepository.save(seller);
    return SellerMapper.toBaseSellerResDto(updatedSeller);
  }

  public async getMe(userData: IUserData): Promise<SellerResDto> {
    const seller = await this.sellerRepository.getMe(userData.user_id);

    return SellerMapper.toResDto(seller);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateSellerReqDto,
  ): Promise<BaseSellerResDto> {
    const seller = await this.isSellerExist(userData.user_id);
    this.sellerRepository.merge(seller, { ...dto });
    const updatedSeller = await this.sellerRepository.save(seller);
    return SellerMapper.toBaseSellerResDto(updatedSeller);
  }

  public async banSeller(
    userData: IUserData,
    sellerId: string,
    dto: UserBanReqDto,
  ): Promise<void> {
    const seller = await this.isSellerExist(sellerId);
    const manager = await this.managerRepository.findOneBy({
      id: userData.user_id,
    });
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
    this.sellerRepository.merge(seller, {
      ...dto,
      isBanned: true,
      bannedBy: manager,
    });
    await this.sellerRepository.save(seller);
  }

  private async isSellerExist(sellerId: string): Promise<SellerEntity> {
    const seller = await this.sellerRepository.findOneBy({ id: sellerId });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    return seller;
  }

  async isPremiumSeller(sellerId: string): Promise<boolean> {
    const seller = await this.sellerRepository.findOneBy({ id: sellerId });

    if (!seller) throw new Error('User not found');

    return (
      seller.accountType === 'premium' && seller.premiumExpiry > new Date()
    );
  }
}
