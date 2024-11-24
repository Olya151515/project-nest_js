import {
  AdminID,
  BuyerID,
  ManagerID,
  SellerID,
} from '../../../common/types/entity-ids.type';

export type UserIdsEnum = { user_Id: AdminID | ManagerID | SellerID | BuyerID };
