import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/guards/auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_NAME } from 'src/common/services';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(NATS_NAME)
    private readonly natsService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAllProducts(@Query() paginationDto: PaginationDto, @Req() req) {
    try {
      return await firstValueFrom(
        this.natsService.send({ cmd: 'getUsers' }, paginationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await firstValueFrom(
        this.natsService.send({ cmd: 'createUser' }, createUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
