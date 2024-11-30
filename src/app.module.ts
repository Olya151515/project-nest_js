import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import configuration from './configs/configuration';
import { AdminModule } from './modules/admin/admin.module';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { AuthModule } from './modules/auth/auth.module';
import { BuyerModule } from './modules/buyer/buyer.module';
import { ManagerModule } from './modules/manager/manager.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { RoleModule } from './modules/role/role.module';
import { SellerModule } from './modules/seller(user)/seller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    RepositoryModule,
    AuthModule,
    AdvertisementModule,
    PostgresModule,
    RedisModule,
    AdminModule,
    ManagerModule,
    SellerModule,
    BuyerModule,
    RoleModule,
  ],
})
export class AppModule {}
