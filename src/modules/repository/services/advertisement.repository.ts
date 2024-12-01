import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AddQueryListReqDto } from '../../advertisement/models/dto/req/add-query-list.req.dto';

@Injectable()
export class AdvertisementRepository extends Repository<AdvertisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertisementEntity, dataSource.manager);
  }

  async findAll(query: AddQueryListReqDto): Promise<AdvertisementEntity[]> {
    const qb = this.createQueryBuilder('advertisement');
    qb.leftJoinAndSelect('advertisement.seller', 'seller');
    qb.leftJoinAndSelect('advertisement.favoriteBuyers', 'favoriteBuyers');
    qb.leftJoinAndSelect('advertisement.images', 'images');
    qb.where('advertisement.status = :status', { status: 'active' });
    if (query.search) {
      qb.andWhere(
        'CONCAT(advertisement.title, advertisement.description) ILIKE :search',
      );
      qb.setParameter('search', `%${query.search}%`);
    }
    if (query.location) {
      qb.andWhere('advertisement.location = :location', {
        location: query.location,
      });
    }
    if (query.price) {
      qb.andWhere('advertisement.price = :price', {
        price: Number(query.price),
      });
    }
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getMany();
  }
  async findById(addId: string): Promise<AdvertisementEntity> {
    const qb = this.createQueryBuilder('advertisement');
    qb.leftJoinAndSelect('advertisement.seller', 'seller');
    qb.leftJoinAndSelect('advertisement.favoriteBuyers', 'favoriteBuyers');
    qb.leftJoinAndSelect('advertisement.images', 'images');
    qb.where('advertisement.id = :addId', { addId });
    qb.andWhere('advertisement.status = :status', { status: 'active' });
    return await qb.getOne();
  }
  async findAllByFavBuyerId(buyerId: string): Promise<AdvertisementEntity[]> {
    const qb = this.createQueryBuilder('advertisement');
    qb.leftJoinAndSelect('advertisement.favoriteBuyers', 'favoriteBuyers');
    qb.where('favoriteBuyers.id = :buyerId', { buyerId });
    return await qb.getMany();
  }
}
