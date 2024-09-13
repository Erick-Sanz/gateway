import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogoutDto } from './dto/logout.dto';
import { NATS_NAME } from 'src/common/services';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_NAME)
    private readonly nastService: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() loginInput: LoginDto, @Req() req) {
    const { password, userNameOrPhoneNumber } = loginInput;
    try {
      const userAgent = req.headers['user-agent'];
      const user = await firstValueFrom(
        this.nastService.send(
          { cmd: 'login' },
          {
            userAgent,
            userNameOrPhoneNumber,
            password,
          },
        ),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto, @Req() req) {
    const { userId } = logoutDto;
    try {
      const user = await firstValueFrom(
        this.nastService.send({ cmd: 'logout' }, userId),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
