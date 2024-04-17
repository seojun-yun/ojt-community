import { Injectable } from "@nestjs/common";
import { Post } from "./post.entity";
import { CreatePostDto } from "../dto/create-post.dto";
import { DB } from "src/database/db";

@Injectable()
export class PostDB extends DB<Post> {
    constructor() {
      super('posts');
    }

    create(data: CreatePostDto, userId: number) {
        const post = new Post();
        post.id = this.getSize()+1;
        post.title = data.title;
        post.content = data.content;
        post.categoryId = data.categoryId;
        post.createdAt = new Date();
        post.authorId = userId;
        
        
        this.insert(post);
    }

    getCategoryRecords(categoryId: number): Post[] {
      return this.findAll().filter(post => post.categoryId === categoryId);
    }
}