import { AdminEntity } from '../admin.entity';
import { BuyerEntity } from '../buyer.entity';
import { ManagerEntity } from '../manager.entity';
import { SellerEntity } from '../seller.entity';

export type EntitiesEnum = {
  entity: ManagerEntity | BuyerEntity | SellerEntity;
};
