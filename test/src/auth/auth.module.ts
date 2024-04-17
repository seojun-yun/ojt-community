import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DBModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UserDB } from './entities/user.db';

@Module({
  imports: [DBModule,JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, AuthGuard, UserDB],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
