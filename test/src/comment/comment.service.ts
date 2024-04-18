import { Injectable } from '@nestjs/common';
import { CommentDB } from './entities/comment.db';
import { AddCommentDto } from 'src/posts/dto/add-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(private readonly commentDB: CommentDB) {}

    getComment(commentId: number) {
        return this.commentDB.findOne(c => c.id === commentId);
    }

    getComments(postId: number) {
        return this.commentDB.filter(c => c.postId === postId);
    }

    getCommentsByParentId(parentId: number) {
        return this.commentDB.filter(c => c.commentId === parentId);
    }

    addComment(postId: number, addCommentDto: AddCommentDto, user: any) {
        const comment = new Comment();
        comment.id = this.commentDB.getSize()+1;
        comment.postId = postId;
        comment.content = addCommentDto.content;
        comment.authorId = user.sub;
        comment.createdAt = new Date();
        if (addCommentDto.commentId) comment.commentId = addCommentDto.commentId;

        this.commentDB.insert(comment);
    }

    updateComment(comment: Comment) {
        this.commentDB.update(comment, c => c.id === comment.id);
    }

    deleteComment(commentId: number) {
        this.commentDB.delete(c => c.id === commentId);
    }

    isCommentExistInPost(postId: number, commentId: number): boolean {
        return this.commentDB.findOne(comment => comment.postId === postId && comment.id === commentId) !== undefined;
    }
}
