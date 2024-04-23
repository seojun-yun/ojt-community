import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';
import { BlockModule } from './blocks/block.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
  
    }),
    CategoriesModule, 
    AuthModule, 
    PostsModule, 
    CommentModule, BlockModule, UsersModule
  ],
})
export class AppModule {}
