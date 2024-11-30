import { ConflictException, Injectable } from '@nestjs/common';

import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AddStatusEnum } from '../../../database/entities/enums/add-status.enum';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { AdvertisementRepository } from '../../repository/services/advertisement.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { BaseAddReqDto } from '../models/dto/req/base-add.req.dto';
import { UpdateAddReqDto } from '../models/dto/req/update-add.req.dto';
import { AddResDto } from '../models/dto/res/add.res.dto';
import { AddMapper } from './add-mapper';

@Injectable()
export class AdvertisementService {
  private badWords = ['badword1', 'badword2'];
  constructor(
    private readonly addRepository: AdvertisementRepository,
    private readonly sellerRepository: SellersRepository,
  ) {}
  public async createAdd(
    userData: IUserData,
    dto: BaseAddReqDto,
  ): Promise<AddResDto> | null {
    const seller = await this.sellerRepository.findOneBy({
      id: userData.user_id,
    });
    const add = await this.addRepository.save(
      this.addRepository.create({
        ...dto,
        status: AddStatusEnum.INACTIVE,
        seller,
      }),
    );
    const checkedAdd = await this.checkAdd(add);
    return AddMapper.toResDto(checkedAdd);
  }

  public async updateAdd(
    userData: IUserData,
    addId: string,
    dto: UpdateAddReqDto,
  ): Promise<AddResDto> {
    const add = await this.addRepository.findOneBy({ id: addId });
    if (!add) {
      throw new ConflictException('Add not found');
    }

    const seller = await this.sellerRepository.findOneBy({
      id: userData.user_id,
    });
    const addItems: number = add.editAttempts;
    if (add.seller_id !== seller.id) {
      throw new ConflictException('You can not update this add');
    }
    if (addItems > 3 && add.status === AddStatusEnum.INACTIVE) {
      throw new ConflictException(
        'Editing forbidden: maximum attempts reached. Please contact support for further assistance.',
      );
    }
    if (addItems == 3) {
      add.status = AddStatusEnum.INACTIVE;
      await this.addRepository.save(add);
      this.notifyManager(add);
    }

    add.editAttempts = (add.editAttempts || 0) + 1;
    const updatesAdd = this.addRepository.merge(add, { ...dto });
    await this.addRepository.save(updatesAdd);
    const checkedAdd = await this.checkAdd(updatesAdd);
    return AddMapper.toResDto(checkedAdd);
  }

  private async checkAdd(
    add: AdvertisementEntity,
  ): Promise<AdvertisementEntity> {
    if (this.containsBadWords(add.description)) {
      add.status = AddStatusEnum.NEEDS_EDIT;
      await this.addRepository.save(add);
      throw new ConflictException(
        'Add description contains inappropriate language. Please edit.',
      );
    }
    add.status = AddStatusEnum.ACTIVE;
    return await this.addRepository.save(add);
  }

  // Перевірка на нецензурні слова
  private containsBadWords(content: string): boolean {
    const regex = new RegExp(this.badWords.join('|'), 'i');
    return regex.test(content);
  }

  private notifyManager(ad: AdvertisementEntity) {
    console.log(`Manager notified about blocked ad: ${ad.id}`);
    // Тут можна реалізувати реальну інтеграцію з email-сервісом.
  }
}
