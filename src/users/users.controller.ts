import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserBlockDto } from './dto/add-user-block.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { BlockService } from 'src/blocks/block.service';

@Controller('users')
export class UsersController {
    constructor (
        private readonly userService: UsersService,
        private readonly blockService: BlockService
    ) {}

    @Get('blocks')
    @UseGuards(JwtAuthGuard)
    findBlocks(@Request() request: any) {
        return this.blockService.findBlockedUsers(request['user'].sub);
    }

    @Post('blocks')
    @UseGuards(JwtAuthGuard)
    addBlock(@Body() addUserBlockDto: AddUserBlockDto, @Request() request: any) {
        return this.userService.addUserBlock(addUserBlockDto, request['user']);
    }
}
