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
    


    return {categories: data}
  }

  private prepareCategories(comments: Comment[]) {
    const prepared = [];
    comments.forEach(c => prepared.push(this.addSubComments(c)));
    return prepared;
  }

  private addSubCategories(comment: Comment) {
    const subComments = this.commentService.findCommentsByParentId(comment.id);
    if (subComments.length === 0) {
      return {...comment};
    }

    const preparedSub = this.prepareComments(subComments);
    return {...comment, subComments: preparedSub};
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
