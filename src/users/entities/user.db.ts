import { Repository } from "src/database/repository";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserDB extends Repository<User> {
    constructor() {
        super('users');
    }

    create(user: User) {
        super.insert(user);
    }

    findOneByUserId(userId: string) {
        const user = super.findAll().find((user: User) => user.userId === userId);

        return user;
    }
}