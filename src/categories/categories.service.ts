import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDB } from './entities/category.db';
import { Category } from './entities/category.entity';
import { CategoriesController } from './categories.controller';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryDB: CategoryDB
  ){}

  create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parentId && !this.categoryDB.findOne(c => c.id === createCategoryDto.parentId)) throw new BadRequestException('parent category not found');

    this.categoryDB.insert({
      id: this.categoryDB.getSize()+1,
      ...createCategoryDto
    });
  }

  findAll() {
    const categories = this.categoryDB.findAll();
    const data = categories.map(category => {
      const subCategories = categories.filter(c => c.parentId === category.id);

      subCategories.forEach(c => {
        categories.splice(categories.indexOf(c), 1);
      });

      return {...category, subCategories};
    }).filter(category => category); //FIXME 1-depth only, like comments
    return {categories: data}
  }


  update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryDB.findOne(c => c.id === categoryId);

    if (!category) {
      throw new BadRequestException('parent category not found');
    }


    if (updateCategoryDto.name) category.name = updateCategoryDto.name;
    if (updateCategoryDto.parentId) {
      if (updateCategoryDto.parentId === categoryId) throw new BadRequestException('parentId cannot same');
      if (!this.categoryDB.findOne(c => c.id === updateCategoryDto.parentId)) throw new BadRequestException('parent category not found');
      category.parentId = updateCategoryDto.parentId;
    }

    this.categoryDB.update(category, c => c.id === categoryId);

    return {category};
  }

  remove(categoryId: number) {
    const category = this.categoryDB.findOne(c => c.id === categoryId);
    
    if (!category) {
      throw new BadRequestException('category not found');
    }

    this.categoryDB.delete(c => c.id === categoryId);
  }
}
