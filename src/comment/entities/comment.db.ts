import { Injectable } from "@nestjs/common";
import { Repository } from "src/database/repository";
import { Comment } from "./comment.entity";

@Injectable()
export class CommentDB extends Repository<Comment> {
    constructor() {
        super('comments');
    }

    
}