import { Injectable } from '@nestjs/common';
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

    const category = new Category();
    category.id = this.categoryDB.getSize()+1;
    category.name = createCategoryDto.name;

    if (createCategoryDto.parentId) {
      if (!this.categoryDB.findOne(c => c.id === createCategoryDto.parentId)) return {success: false, message: 'category not found'};
      category.parentId = createCategoryDto.parentId;
    }

    this.categoryDB.insert(category);

    return {success: true}
  }

  findAll() {
    const categories = this.categoryDB.findAll();

    const data = categories.map(category => {
      const subCategories = this.categoryDB.filter(c => c.parentId === category.id);

      subCategories.forEach(c => categories.splice(categories.indexOf(c), 1));

      return {...category, subCategories};
    }).filter(category => category); //FIXME 1-depth only, like comments

    return {success: true, categories: data}
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryDB.findOne(c => c.id === id);

    if (!category) {
      return {success: false, message: 'category not found'};
    }


    if (updateCategoryDto.name) category.name = updateCategoryDto.name;
    if (updateCategoryDto.parentId) {
      if (!this.categoryDB.findOne(c => c.id === updateCategoryDto.parentId)) return {success: false, message: 'category not found'};
      category.parentId = updateCategoryDto.parentId;
    }

    this.categoryDB.update(category, c => c.id === id);

    return {success: true};
  }

  remove(id: number) {
    const category = this.categoryDB.findOne(c => c.id === id);
    
    if (!category) {
      return {success: false, message: 'category not found'};
    }

    this.categoryDB.delete(c => c.id === id);
    return {success: true};
  }
}
