import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    DBModule, 
    CategoriesModule, 
    AuthModule, 
    PostsModule, 
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
