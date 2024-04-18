import { Injectable } from "@nestjs/common";
import { DB } from "src/database/db";
import { Comment } from "./comment.entity";

@Injectable()
export class CommentDB extends DB<Comment> {
    constructor() {
        super('comments');
    }

    
}