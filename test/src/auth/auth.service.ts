import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserDB } from './entities/user.db';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userDB: UserDB,
        private readonly jwtService: JwtService
    ) { }

    login(userid: string, password: string) {
        const user = this.userDB.findOneByUserId(userid);
        if (user?.password !== password) {
            return {success: false};
        }

        const payload = { username: user.userId, sub: user.id };
        return {
            success: true,
            access_token: this.jwtService.sign(payload),
        };
    }

    register(userid: string, password: string, name: string) {
        const user = this.userDB.findOneByUserId(userid);
        if (user) {
            return {success: false};
        }

        this.userDB.create(userid, password, name);
        
        return {success: true};
    }

    async validateToken(authorization: string, request: Request): Promise<boolean> {
        try {
            const payload = await this.jwtService.verifyAsync<User>(authorization.replace('Bearer ', ''));
            request['user'] = payload; // to access user object
            return true;
        } catch (error) {
            return false;
        }
    }
}
