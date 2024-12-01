import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BuyerEntity } from '../../../database/entities/buyer.entity';
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
    const buyer = await this.isBuyerExist(userData.user_id);

    const add = await this.addRepository.findOneBy({ id: addId });
    if (!add) {
      throw new NotFoundException('Advertisement not found');
    }
    const favoriteAdds = await this.addRepository.findAllByFavBuyerId(buyer.id);
    const isAlreadyFavorite = favoriteAdds.some(
      (favAdd) => favAdd.id === add.id,
    );
    if (isAlreadyFavorite) {
      throw new ConflictException('You already have this add in favorites');
    }
    const allAds = [...favoriteAdds, add];
    this.buyerRepository.merge(buyer, { favoriteAds: allAds });
    const updatedBuyer = await this.buyerRepository.save(buyer);
    return BuyerMapper.toBuyerResDto(updatedBuyer);
  }
  public async deleteFavoriteAdd(
    userData: IUserData,
    addId: string,
  ): Promise<BuyerResDto> {
    const buyer = await this.isBuyerExist(userData.user_id);
    const add = await this.addRepository.findOneBy({ id: addId });
    if (!add) {
      throw new NotFoundException('Advertisement not found');
    }
    const favoriteAdds = await this.addRepository.findAllByFavBuyerId(buyer.id);
    const isAddFavorite = favoriteAdds.some((favAdd) => favAdd.id === add.id);

    if (!isAddFavorite) {
      throw new ConflictException('You do not have  this add in favorites');
    }

    buyer.favoriteAds = favoriteAdds.filter((favAdd) => favAdd.id !== addId);
    const updatedBuyer = await this.buyerRepository.save(buyer);
    return BuyerMapper.toBuyerResDto(updatedBuyer);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdatedBuyerReqDto,
  ): Promise<UpdatedBuyerResDto> {
    const buyer = await this.isBuyerExist(userData.user_id);
    this.buyerRepository.merge(buyer, { ...dto });
    const updatedBuyer = await this.buyerRepository.save(buyer);
    return BuyerMapper.toUpdatedBuyerResDto(updatedBuyer);
  }

  public async blockBuyer(
    userData: IUserData,
    buyerId: string,
    dto: UserBanReqDto,
  ): Promise<void> {
    const buyer = await this.isBuyerExist(buyerId);
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
  private async isBuyerExist(buyerId: string): Promise<BuyerEntity> {
    const buyer = await this.buyerRepository.findOneBy({ id: buyerId });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }
    return buyer;
  }
}
