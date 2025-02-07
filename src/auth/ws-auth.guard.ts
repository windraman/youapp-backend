import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const token = this.extractTokenFromSocket(client);

    if (!token) {
      console.log('❌ No token provided');
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      client.data.user = payload; // Attach user data to socket
      console.log('✅ Authenticated:', payload);
      return true;
    } catch (error) {
      console.log('❌ Invalid token', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromSocket(client: Socket): string | null {
    const authHeader = client.handshake.headers.authorization;
    return authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  }
}
