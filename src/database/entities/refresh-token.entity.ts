import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import {
  AdminID,
  BuyerID,
  ManagerID,
  RefreshTokenID,
  SellerID,
} from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';

export type userIDs = {
  user_id: AdminID | SellerID | BuyerID | ManagerID;
};

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: RefreshTokenID;

  @Column('text')
  deviceId: string;

  @Column('text')
  refreshToken: string;

  @Column({ type: 'varchar', length: 255 }) // Використовуємо varchar для збереження user_id
  user_id: string;

  @Column('text') // Використовуємо Enum для userType
  userRole: string;
}
