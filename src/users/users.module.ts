import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NastModule } from 'src/nast/nast.module';

@Module({
  controllers: [UsersController],
  imports: [NastModule],
})
export class UsersModule {}
