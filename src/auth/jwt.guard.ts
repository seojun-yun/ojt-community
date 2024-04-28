import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
