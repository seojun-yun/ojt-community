import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDB } from './entities/user.db';
import { User } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AddUserBlockDto } from './dto/add-user-block.dto';
import { BlockService } from 'src/blocks/block.service';
import { NotFoundError } from 'rxjs';

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
        // FIXME ???

        if (addUserBlockDto.targetUserId === user.sub) throw new BadRequestException('cannot block your self');

        const targetUser = this.userDB.findOne(u => u.id === addUserBlockDto.targetUserId);

        if (!targetUser) throw new NotFoundException('target user not found');

        const block = this.blockService.findBlockByUserId(user.sub, addUserBlockDto.targetUserId);
        console.log(block);
        if (block) throw new ConflictException('already blocked');

        this.blockService.addBlock(addUserBlockDto, user.sub);
    }

    findUser(expression: (value: User, index: number, obj: User[]) => boolean) {
        return this.userDB.findOne(expression);
    }

    findUserByUserId(userId: string) {
        return this.userDB.findOneByUserId(userId);
    }
}
