import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostDB } from './entities/post.db';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comment/comment.module';
import { DBModule } from 'src/database/database.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostDB],
  imports: [AuthModule, CommentModule, DBModule]
})
export class PostsModule {}
