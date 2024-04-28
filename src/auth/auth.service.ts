import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    login(loginDto: LoginDto) {
        const user = this.userService.findUserByUserId(loginDto.userid);
        if (user?.password !== loginDto.password) {
            return new UnauthorizedException('invalid credentials')
        }

        const payload = { userId: user.userId, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    register(registerDto: RegisterDto) {
        const user = this.userService.findUserByUserId(registerDto.userId);
        if (user) {
            throw new ConflictException('userId already used')
        }

        this.userService.createUser(registerDto);
        
        return {
            userId: registerDto.userId
        };
    }
}
