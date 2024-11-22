import {
  AdminID,
  BuyerID,
  ManagerID,
  SellerID,
} from '../../../common/types/entity-ids.type';

export type UserIdsEnum = { userId: AdminID | ManagerID | SellerID | BuyerID };
