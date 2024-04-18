import { Injectable } from "@nestjs/common";
import { Post } from "./post.entity";
import { CreatePostDto } from "../dto/create-post.dto";
import { DB } from "src/database/db";
import { PaginationQuery } from "src/common/dto/pagination-query.dto";

@Injectable()
export class PostDB extends DB<Post> {
    constructor() {
      super('posts');
    }

    create(data: CreatePostDto, userId: number) {
        this.insert({
          id: this.getSize()+1,
          createdAt: new Date(),
          authorId: userId,
          ...data
        });
    }

    findAllPosts(pagination: PaginationQuery) {
      const mustSkip = pagination.page === 1 ? 0 : (pagination.page-1)*pagination.perPage;

      return super.findAll().slice(mustSkip, mustSkip+pagination.perPage);
    }

    findCategoryRecords(categoryId: number, pagination: PaginationQuery): Post[] {
      const mustSkip = pagination.page === 1 ? 0 : (pagination.page-1)*pagination.perPage;

      return this.filter(post => post.categoryId === categoryId).slice(mustSkip, mustSkip+pagination.perPage);
    }
}