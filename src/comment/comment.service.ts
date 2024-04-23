import { Injectable } from '@nestjs/common';
import { CommentDB } from './entities/comment.db';
import { AddCommentDto } from 'src/posts/dto/add-comment.dto';
import { Comment } from './entities/comment.entity';
import { BlockService } from 'src/blocks/block.service';


@Injectable()
export class CommentService {
    constructor(
        private readonly commentDB: CommentDB,
        private readonly blockService: BlockService
    ) {}

    findComment(commentId: number) {
        return this.commentDB.findOne(c => c.id === commentId);
    }

    findComments(postId: number, userId: number) {
        const blockedUsers = this.blockService.findBlockedUsers(userId);
        return this.commentDB.filter(c => c.postId === postId);// && !blockedUsers.find(b => b.targetUserId === c.authorId));
    }

    findCommentsByParentId(parentId: number) {
        return this.commentDB.filter(c => c.commentId === parentId);
    }

    addComment(postId: number, addCommentDto: AddCommentDto, user: any) {
        this.commentDB.insert({
            id: this.commentDB.getSize()+1,
            postId: postId,
            authorId: user.sub,
            createdAt: new Date(),
            ...addCommentDto
        });
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
