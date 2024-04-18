import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Put(':categoryId')
  @UseGuards(AuthGuard)
  update(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @UseGuards(AuthGuard)
  remove(@Param('categoryId', ParseIntPipe) categoryId: number) {
    this.categoriesService.remove(categoryId);
  }
}
