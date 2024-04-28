import { Body, Controller, Delete, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserBlockDto } from './dto/add-user-block.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { BlockService } from 'src/blocks/block.service';
import { User } from 'src/common/decorator/user.decorator';
import { RemoveUserBlockDto } from './dto/remove-user-block.dto';

@Controller('users')
export class UsersController {
    constructor (
        private readonly userService: UsersService,
        private readonly blockService: BlockService
    ) {}

    @Get('blocks')
    @UseGuards(JwtAuthGuard)
    findBlocks(@User() user: any) {
        const blocked = this.blockService.findBlockedUsers(user.sub);

        return { blocked };
    }

    @Post('blocks')
    @UseGuards(JwtAuthGuard)
    addBlock(@Body() addUserBlockDto: AddUserBlockDto, @User() user: any) {
        return this.userService.addUserBlock(addUserBlockDto, user);
    }

    @Delete('blocks')
    @UseGuards(JwtAuthGuard)
    removeBlock(@Body() removeUserBlockDto: RemoveUserBlockDto, @User() user: any) {
        return this.userService.removeUserBlock(removeUserBlockDto, user);
    }
}
