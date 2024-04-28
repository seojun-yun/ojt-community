import { Injectable } from "@nestjs/common";
import { Post } from "./post.entity";
import { CreatePostDto } from "../dto/create-post.dto";
import { Repository } from "src/database/repository";
import { PaginationQuery } from "src/common/dto/pagination-query.dto";

@Injectable()
export class PostDB extends Repository<Post> {
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

    findAllPosts(pagination: PaginationQuery, categoryId?: number): Post[] {
      const mustSkip = pagination.page === 1 ? 0 : (pagination.page-1)*pagination.perPage;

      const posts = this.findAll();
      
      if(categoryId) return posts.filter(post => post.categoryId === categoryId).slice(mustSkip, mustSkip+pagination.perPage);
      
      return posts.slice(mustSkip, mustSkip+pagination.perPage);
    }
}