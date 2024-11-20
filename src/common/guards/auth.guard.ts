import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Implement your logic here (e.g., check if the user is authenticated)
    const request = context.switchToHttp().getRequest();

    // Example: Check for a valid token
    const req = request.query.headers.Authorization;
    // return  ? true : false;
    if (!req) throw new UnauthorizedException('User Unauthorized');
    const payload = await this.jwtService.verifyAsync(req);
    request.user = payload;
    return true;
  }
}
