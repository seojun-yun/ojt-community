import { Repository } from "src/database/repository";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { RegisterDto } from "../dto/register.dto";

@Injectable()
export class UserDB extends Repository<User> {
    constructor() {
        super('users');
    }

    create(registerDto: RegisterDto) {
        super.insert({
            id: super.getSize()+1,
            ...registerDto
        });
    }

    findOneByUserId(userId: string) {
        const user = super.findAll().find((user: User) => user.userId === userId);

        return user;
    }
}