import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserDB } from './entities/user.db';
import { User } from './entities/user.entity';
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
            return {success: false}; //FIXME exception
        }

        const payload = { userId: user.userId, sub: user.id };
        //FIXME exception
        return {
            success: true,
            access_token: this.jwtService.sign(payload),
        };
    }

    register(registerDto: RegisterDto) {
        const user = this.userDB.findOneByUserId(registerDto.userId);
        if (user) {
            return {success: false}; //FIXME exc
        }

        this.userDB.create(registerDto);
        
        return {success: true}; //FIXME exc
    }

    async validateToken(authorization: string, request: Request): Promise<boolean> {
        try {
            const payload = await this.jwtService.verifyAsync(authorization.replace('Bearer ', ''));
            request['user'] = payload; // to access user object
            return true;
        } catch (error) {
            return false;
        }
    }
}
