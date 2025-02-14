import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_NAME } from 'src/common/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_NAME) private readonly nastService: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { user, token: newToken } = await firstValueFrom(
        this.nastService.send({ cmd: 'verifyAccesToken' }, token),
      );
      request['user'] = user;
      request['token'] = newToken;
    } catch (error) {
      throw new RpcException(error);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const tokenHeader = request.headers['x-token'];
    if (typeof tokenHeader === 'string') {
      const [type, token] = tokenHeader.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
    return undefined;
  }
}
