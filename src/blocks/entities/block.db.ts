import { Repository } from "src/database/repository";
import { Block } from "./block.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlockDB extends Repository<Block> {
    constructor() {
        super('blocks')
    }

    findBlockedUsers(userId: number) {
        return this.filter(user => user.sourceUserId === userId);
    }
}