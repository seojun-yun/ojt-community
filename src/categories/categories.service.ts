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
    if (createCategoryDto.parentId && !this.categoryDB.findOne(c => c.id === createCategoryDto.parentId)) return {success: false, message: 'category not found'}; //FIXME change to filter exception

    this.categoryDB.insert({
      id: this.categoryDB.getSize()+1,
      ...createCategoryDto
    });

    return {success: true}
  }

  findAll() {
    const categories = this.categoryDB.findAll();

    const data = categories.map(category => {
      const subCategories = this.categoryDB.filter(c => c.parentId === category.id);

      subCategories.forEach(c => categories.splice(categories.indexOf(c), 1));

      return {...category, subCategories};
    }).filter(category => category); //FIXME 1-depth only, like comments

    return {success: true, categories: data} //FIXME exception filter
  }


  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryDB.findOne(c => c.id === id);

    if (!category) {
      return {success: false, message: 'category not found'}; //FIXME Exception
    }


    if (updateCategoryDto.name) category.name = updateCategoryDto.name;
    if (updateCategoryDto.parentId) {
      if (!this.categoryDB.findOne(c => c.id === updateCategoryDto.parentId)) return {success: false, message: 'category not found'}; //FIXME exception
      category.parentId = updateCategoryDto.parentId;
    }

    this.categoryDB.update(category, c => c.id === id);

    return {success: true}; //FIXME exception
  }

  remove(id: number) {
    const category = this.categoryDB.findOne(c => c.id === id);
    
    if (!category) {
      return {success: false, message: 'category not found'}; //FIXME exception
    }

    this.categoryDB.delete(c => c.id === id);
    return {success: true}; //FIXME exception
  }
}
