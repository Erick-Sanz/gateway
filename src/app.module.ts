import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/config.module';
import { NastModule } from './nast/nast.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule, NastModule],
})
export class AppModule {}
