import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDB } from './entities/user.db';
import { User } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AddUserBlockDto } from './dto/add-user-block.dto';
import { BlockService } from 'src/blocks/block.service';
import { RemoveUserBlockDto } from './dto/remove-user-block.dto';

@Injectable()
export class UsersService {
    constructor (
        private readonly userDB: UserDB,
        private readonly blockService: BlockService
    ) {}

    createUser(registerDto: RegisterDto) {
        this.userDB.create({
            id: this.userDB.getSize()+1,
            ...registerDto
        });
    }
    
    addUserBlock(addUserBlockDto: AddUserBlockDto, user: any) {
        if (addUserBlockDto.targetUserId === user.sub) throw new BadRequestException('cannot block self');

        const targetUser = this.userDB.findOne(u => u.id === addUserBlockDto.targetUserId);

        if (!targetUser) throw new NotFoundException('target user not found');

        const block = this.blockService.findBlockByUserId(user.sub, addUserBlockDto.targetUserId);

        if (block) throw new ConflictException('already blocked');

        this.blockService.addBlock(addUserBlockDto, user.sub);
    }

    findUser(expression: (value: User, index: number, obj: User[]) => boolean) {
        return this.userDB.findOne(expression);
    }

    findUserByUserId(userId: string) {
        return this.userDB.findOneByUserId(userId);
    }

    removeUserBlock(removeUserBlockDto: RemoveUserBlockDto, user: any) {
        if (removeUserBlockDto.targetUserId === user.sub) throw new BadRequestException('cannot unblock self');


        // addUserBlock에서 검증해서 필요없음
        // const targetUser = this.userDB.findOne(u => u.id === removeUserBlockDto.targetUserId);

        // if (!targetUser) throw new NotFoundException('target user not found');

        const block = this.blockService.findBlockByUserId(user.sub, removeUserBlockDto.targetUserId);

        if (!block) throw new NotFoundException('target user is not blocked');

        this.blockService.removeBlock(removeUserBlockDto, user.sub);
    }
}
