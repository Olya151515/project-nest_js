import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { AdminModule } from './modules/admin/admin.module';
import { AdvertisementModule } from './modules/announcements/advertisement.module';
import { AuthModule } from './modules/auth/auth.module';
import { ManagerModule } from './modules/manager/manager.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { SellerModule } from './modules/seller(user)/seller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    AdvertisementModule,
    PostgresModule,
    RedisModule,
    AdminModule,
    ManagerModule,
    SellerModule,
  ],
})
export class AppModule {}
