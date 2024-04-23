import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDB } from './entities/user.db';
import { BlockModule } from 'src/blocks/block.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserDB],
  exports: [UsersService],
  imports: [BlockModule]
})
export class UsersModule {}
