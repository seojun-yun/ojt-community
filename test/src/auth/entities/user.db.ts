import { DB } from "src/database/db";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserDB extends DB<User> {
    constructor() {
        super('users');
    }

    create(userId: string, password: string, name: string) {
        const user = new User();
        user.id = super.getSize()+1;
        user.name = name;
        user.userId = userId;
        user.password = password;

        super.insert(user);
    }

    findOneByUserId(userId: string) {
        super.getAllRecords()
        const user = super.getAllRecords().find((user: User) => user.userId === userId);

        return user;
    }
}