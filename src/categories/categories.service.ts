import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDB } from './entities/category.db';
import { Category } from './entities/category.entity';

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
    const categories = this.categoryDB.findAll().filter(c => !c.parentId);
    
    const data = this.prepareCategories(categories);

    return { categories: data }
  }

  private prepareCategories(categories: Category[]) {
    const prepared = [];
    categories.forEach(c => prepared.push(this.addSubCategories(c)));
    return prepared;
  }

  private addSubCategories(category: Category) {
    const subCategories = this.categoryDB.findCategoriesWithParentId(category.id);
    if (subCategories.length === 0) {
      return { ...category };
    }

    const preparedSub = this.prepareCategories(subCategories);
    return { ...category, subCategories: preparedSub };
  }


  update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryDB.findOne(c => c.id === categoryId);

    if (!category) {
      throw new BadRequestException('parent category not found');
    }


    if (updateCategoryDto.name) category.name = updateCategoryDto.name;
    if (updateCategoryDto.parentId) {
      if (updateCategoryDto.parentId === categoryId) throw new BadRequestException('parentId cannot same as id');
      if (!this.categoryDB.findOne(c => c.id === updateCategoryDto.parentId)) throw new BadRequestException('parent category not found');
      category.parentId = updateCategoryDto.parentId;
      //TODO clean code
    }

    this.categoryDB.update(category, c => c.id === categoryId);

    return { category };
  }

  remove(categoryId: number) {
    const category = this.categoryDB.findOne(c => c.id === categoryId);
    
    if (!category) {
      throw new BadRequestException('category not found');
    }

    this.categoryDB.delete(c => c.id === categoryId);
  }
}
