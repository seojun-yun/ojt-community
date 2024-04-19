import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Put(':categoryId')
  @UseGuards(JwtAuthGuard)
  update(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('categoryId', ParseIntPipe) categoryId: number) {
    this.categoriesService.remove(categoryId);
  }
}
