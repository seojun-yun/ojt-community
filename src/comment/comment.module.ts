import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDB } from './entities/comment.db';
import { DBModule } from 'src/database/database.module';
import { BlockModule } from 'src/blocks/block.module';

@Module({
  providers: [CommentService, CommentDB],
  imports: [DBModule, BlockModule],
  exports: [CommentService]
})
export class CommentModule {}
