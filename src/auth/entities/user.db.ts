import { DB } from "src/database/db";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { RegisterDto } from "../dto/register.dto";

@Injectable()
export class UserDB extends DB<User> {
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