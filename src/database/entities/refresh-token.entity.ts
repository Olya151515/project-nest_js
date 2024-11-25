import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';

export type userIDs = {
  user_id: string;
};

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  deviceId: string;

  @Column('text')
  refreshToken: string;

  @Column({ nullable: false })
  user_id: string;

  @Column('text') // Використовуємо Enum для userType
  userRole: string;
}
