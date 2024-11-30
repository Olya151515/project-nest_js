import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/models/interfaces/user-data';
import { AdvertisementRepository } from '../../repository/services/advertisement.repository';
import { BuyersRepository } from '../../repository/services/buyers.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { UpdatedBuyerReqDto } from '../models/dto/req/updated-buyer.req.dto';
import { UserBanReqDto } from '../models/dto/req/user-ban.req.dto';
import { BuyerResDto } from '../models/dto/res/buyer.res.dto';
import { UpdatedBuyerResDto } from '../models/dto/res/updated-buyer.res.dto';
import { BuyerMapper } from './buyer.mapper';

@Injectable()
export class BuyerService {
  constructor(
    private readonly buyerRepository: BuyersRepository,
    private readonly addRepository: AdvertisementRepository,
    private readonly managerRepository: ManagersRepository,
  ) {}
  public async getMe(userData: IUserData): Promise<BuyerResDto> {
    const buyer = await this.buyerRepository.findMe(userData);
    return BuyerMapper.toBuyerResDto(buyer);
  }

  public async favoriteAdd(
    addId: string,
    userData: IUserData,
  ): Promise<BuyerResDto> {
    const buyer = await this.buyerRepository.findOneBy({
      id: userData.user_id,
    });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }

    const add = await this.addRepository.findOneBy({ id: addId });
    if (!add) {
      throw new NotFoundException('Advertisement not found');
    }
    const addFavoriteBuyer = add.favoriteBuyers.map((buyer) =>
      BuyerMapper.toBuyerResDto(buyer),
    );
    const isAlreadyFavorite = addFavoriteBuyer.some(
      (favBuyer) => favBuyer.id === buyer.id,
    );
    if (isAlreadyFavorite) {
      throw new ConflictException('You already have this add in favorites');
    }
    buyer.favoriteAds.push(add);
    const updatedBuyer = await this.buyerRepository.save(buyer);
    return BuyerMapper.toBuyerResDto(updatedBuyer);
  }
  public async deleteFavoriteAdd(
    userData: IUserData,
    addId: string,
  ): Promise<BuyerResDto> {
    const buyer = await this.buyerRepository.findOneBy({
      id: userData.user_id,
    });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }
    const add = await this.addRepository.findOneBy({ id: addId });
    if (!add) {
      throw new NotFoundException('Advertisement not found');
    }
    const isAddFavorite = buyer.favoriteAds.some(
      (buyerAdd) => buyerAdd.id === add.id,
    );
    if (!isAddFavorite) {
      throw new ConflictException('You do not have  this add in favorites');
    }

    buyer.favoriteAds = buyer.favoriteAds.filter(
      (favAdd) => favAdd.id !== addId,
    );
    const updatedBuyer = await this.buyerRepository.save(buyer);
    return BuyerMapper.toBuyerResDto(updatedBuyer);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdatedBuyerReqDto,
  ): Promise<UpdatedBuyerResDto> {
    const buyer = await this.buyerRepository.findOneBy({
      id: userData.user_id,
    });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }
    this.buyerRepository.merge(buyer, { ...dto });
    const updatedBuyer = await this.buyerRepository.save(buyer);
    return BuyerMapper.toUpdatedBuyerResDto(updatedBuyer);
  }

  public async blockBuyer(
    userData: IUserData,
    buyerId: string,
    dto: UserBanReqDto,
  ): Promise<void> {
    const buyer = await this.buyerRepository.findOneBy({ id: buyerId });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }
    const manager = await this.managerRepository.findOneBy({
      id: userData.user_id,
    });
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
    this.buyerRepository.merge(buyer, {
      ...dto,
      isBanned: true,
      bannedBy: manager,
    });
    await this.buyerRepository.save(buyer);
  }
}
