import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.USERS)
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
