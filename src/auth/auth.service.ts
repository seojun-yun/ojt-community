import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDB } from './entities/user.db';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userDB: UserDB,
        private readonly jwtService: JwtService
    ) { }

    login(loginDto: LoginDto) {
        const user = this.userDB.findOneByUserId(loginDto.userid);
        if (user?.password !== loginDto.password) {
            return new UnauthorizedException('invalid credentials')
        }

        const payload = { userId: user.userId, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    register(registerDto: RegisterDto) {
        const user = this.userDB.findOneByUserId(registerDto.userId);
        if (user) {
            throw new ConflictException('userId already used')
        }

        this.userDB.create(registerDto);
        
        return {
            userId: registerDto.userId
        };
    }
}
