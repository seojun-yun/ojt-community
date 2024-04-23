import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDB } from './entities/block.db';

// move to user module?
@Module({
  providers: [BlockService, BlockDB],
  exports: [BlockService]
})
export class BlockModule {}
