import { Column, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';

import { RoleEntity } from '../role.entity';

export class BaseUserEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => RoleEntity, (role) => role.user)
  roles: RoleEntity[];
}
