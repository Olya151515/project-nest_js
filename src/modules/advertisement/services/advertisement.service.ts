import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AddStatusEnum } from '../../../database/entities/enums/add-status.enum';
import { IUserData } from '../../auth/models/interfaces/user-data';
import { AdvertisementRepository } from '../../repository/services/advertisement.repository';
import { CarBrandsRepository } from '../../repository/services/car-brands.repository';
import { CarImageRepository } from '../../repository/services/car-image.repository';
import { CarModelsRepository } from '../../repository/services/car-models.repository';
import { ManagersRepository } from '../../repository/services/managers.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { AddQueryListReqDto } from '../models/dto/req/add-query-list.req.dto';
import { BaseAddReqDto } from '../models/dto/req/base-add.req.dto';
import { UpdateAddReqDto } from '../models/dto/req/update-add.req.dto';
import { AddResDto } from '../models/dto/res/add.res.dto';
import { BaseAdsResDto } from '../models/dto/res/base-ads.res.dto';
import { AddMapper } from './add-mapper';

@Injectable()
export class AdvertisementService {
  private badWords = ['badword1', 'badword2'];
  constructor(
    private readonly addRepository: AdvertisementRepository,
    private readonly sellerRepository: SellersRepository,
    private readonly carImageRepository: CarImageRepository,
    private readonly carBrandRepository: CarBrandsRepository,
    private readonly carModelRepository: CarModelsRepository,
    private readonly managerRepository: ManagersRepository,
  ) {}
  public async createAdd(
    userData: IUserData,
    dto: BaseAddReqDto,
  ): Promise<AddResDto> | null {
    const seller = await this.sellerRepository.findOneBy({
      id: userData.user_id,
    });
    const sellerAds = await this.addRepository.find({
      where: { seller_id: seller.id },
    });
    if (sellerAds.length >= 1 && seller.accountType === 'base') {
      throw new ConflictException(
        'You already have one add , you can not create another one , because you have base account',
      );
    }

    const brand = await this.carBrandRepository.findOneBy({ name: dto.brand });
    if (!brand) {
      throw new NotFoundException('Brand do not exist , please notify manager');
    }
    const model = await this.carModelRepository.findOneBy({
      name: dto.model,
      brand: brand,
    });
    if (!model) {
      throw new NotFoundException('Model do not exist , please notify manager');
    }
    const add = await this.addRepository.save(
      this.addRepository.create({
        ...dto,
        status: AddStatusEnum.INACTIVE,
        seller,
        brand,
        model,
      }),
    );
    const checkedAdd = await this.checkAdd(add);
    return AddMapper.toResDto(checkedAdd);
  }

  public async getAllAdds(query: AddQueryListReqDto): Promise<BaseAdsResDto[]> {
    const adds = await this.addRepository.findAll(query);
    return adds.map((add) => AddMapper.toBaseResDto(add));
  }

  public async getById(addId: string): Promise<BaseAdsResDto> {
    const add = await this.addRepository.findById(addId);
    if (!add) {
      throw new NotFoundException('Add not found');
    }
    return AddMapper.toBaseResDto(add);
  }

  public async uploadCArImages(
    userData: IUserData,
    files: Express.Multer.File[],
    addId: string,
  ): Promise<void> {
    const add = await this.addRepository.findOneBy({ id: addId });
    const pathFile = files.map((file) =>
      this.buildPath('image', add.id, file.originalname),
    );
    console.log(pathFile);
    pathFile.map((path) =>
      this.carImageRepository.save({ imageUrl: path, advertisementId: add.id }),
    );
  }

  public async updateAdd(
    userData: IUserData,
    addId: string,
    dto: UpdateAddReqDto,
  ): Promise<AddResDto> {
    const add = await this.addRepository.findOneBy({ id: addId });
    if (!add) {
      throw new NotFoundException('Add not found');
    }

    const seller = await this.sellerRepository.findOneBy({
      id: userData.user_id,
    });
    if (!seller) {
      throw new ConflictException('Seller do not exist');
    }
    const addItems: number = add.editAttempts;
    if (add.seller_id !== seller.id) {
      throw new ConflictException('You can not update this add');
    }

    if (addItems > 3 && add.status === AddStatusEnum.INACTIVE) {
      throw new ConflictException(
        'Editing forbidden: maximum attempts reached. Please contact support for further assistance.',
      );
    }
    if (addItems === 3) {
      add.editAttempts = (add.editAttempts || 0) + 1;
      add.status = AddStatusEnum.INACTIVE;
      await this.addRepository.save(add);
      this.notifyManager(add);
      throw new ConflictException(
        'Your add is blocked , Manager notified about that',
      );
    }

    add.editAttempts = (add.editAttempts || 0) + 1;
    const updatesAdd = this.addRepository.merge(add, { ...dto });
    await this.addRepository.save(updatesAdd);
    const checkedAdd = await this.checkAdd(updatesAdd);
    return AddMapper.toResDto(checkedAdd);
  }

  public async deleteAdd(addId: string, userData: IUserData): Promise<void> {
    const add = await this.addRepository.findOneBy({ id: addId });
    if (!add) {
      throw new NotFoundException('Add not found');
    }
    const seller = await this.sellerRepository.findOneBy({
      id: userData.user_id,
    });
    const manager = await this.managerRepository.findOneBy({
      id: userData.user_id,
    });
    if (!manager && seller.id !== add.seller_id) {
      throw new ConflictException(
        'You do not create this add , you can not delete!',
      );
    }
    await this.addRepository.remove(add);
  }

  private async checkAdd(
    add: AdvertisementEntity,
  ): Promise<AdvertisementEntity> {
    if (this.containsBadWords(add.description)) {
      add.status = AddStatusEnum.NEEDS_EDIT;
      await this.addRepository.save(add);
      throw new ConflictException(
        'Add description contains inappropriate language. Please update and edit.',
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
  private buildPath(
    itemType: 'image',
    itemId: string,
    fileName: string,
  ): string {
    const filePath = `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
    return filePath; // use only  template string
  }
}
