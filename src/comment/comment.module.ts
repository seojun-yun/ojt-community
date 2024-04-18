import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDB } from './entities/comment.db';
import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/database/database.module';

@Module({
  providers: [CommentService, CommentDB],
  imports: [AuthModule, DBModule],
  exports: [CommentService]
})
export class CommentModule {}
