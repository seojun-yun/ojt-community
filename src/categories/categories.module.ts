import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { DBModule } from 'src/database/database.module';
import { CategoryDB } from './entities/category.db';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryDB],
  imports: [DBModule, AuthModule]
})
export class CategoriesModule {}
