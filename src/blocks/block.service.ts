import { Injectable } from '@nestjs/common';
import { BlockDB } from './entities/block.db';
import { Block } from './entities/block.entity';
import { AddUserBlockDto } from 'src/users/dto/add-user-block.dto';
import { RemoveUserBlockDto } from 'src/users/dto/remove-user-block.dto';

@Injectable()
export class BlockService {
    constructor(
        private readonly blockDB: BlockDB
    ) {}

    // addBlock(block: Block) {
    //     this.blockDB.insert(block);
    // }

    addBlock(addUserBlockDto: AddUserBlockDto, sourceUserId: number) {
        this.blockDB.insert({
            id: this.blockDB.getSize()+1,
            blockedAt: new Date(),
            sourceUserId: sourceUserId,
            ...addUserBlockDto
        });
    }

    removeBlock(removeUserBlockDto: RemoveUserBlockDto, sourceUserId: number) {
        this.blockDB.delete(b => b.sourceUserId === sourceUserId && b.targetUserId === removeUserBlockDto.targetUserId);
    }


    findBlockedUsers(userId: number) {
        const blocked = this.blockDB.findBlockedUsers(userId);
        return blocked;
    }

    findBlockByUserId(sourceUserId: number, targetUserId: number) {
        return this.blockDB.findOne(b => b.sourceUserId === sourceUserId && b.targetUserId === targetUserId);
    }
}
