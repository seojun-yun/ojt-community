import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDB } from './entities/post.db';
import { CommentService } from 'src/comment/comment.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from 'src/comment/entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetPostByCategoryQuery } from './dto/get-post-by-category.query';
import { PaginationQuery } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postDB: PostDB,
    private readonly commentService: CommentService
  ) {}

  create(createPostDto: CreatePostDto, user: any) {

    this.postDB.create(createPostDto, user.sub);

    return createPostDto;
  }

  findAll(query: GetPostByCategoryQuery) {
    const {page, perPage} = query;

    if (query.categoryId) {
      return {success: true, posts: this.postDB.findCategoryRecords(query.categoryId, {page, perPage})};
    }

    return {success: true, posts: this.postDB.findAllPosts({page, perPage})};
  }

  findOne(id: number) {
    const post = this.postDB.findOne(p => p.id === id);
    return {success: true, post: post};
  }

  update(id: number, updatePostDto: UpdatePostDto, user: any) {
    const post = this.postDB.findOne(post => post.authorId === user.sub && post.id === id);
    if (!post) {
      return {success: false, message: 'post not found'};
    }

    if (updatePostDto.title) post.title = updatePostDto.title;
    if (updatePostDto.content) post.content = updatePostDto.content;

    this.postDB.update(post, p => p.id == post.id);
    return {success:true};
  }

  remove(id: number, user: any) {
    const post = this.postDB.findOne(post => post.id === id && post.authorId === user.sub);
    
    if (!post) {
      return {success: false, message: 'post not found'};
    }

    this.postDB.delete(p => p.id === id);
    return {success: true};
  }

  findComments(postId: number) {
    const post = this.postDB.findOne(p => p.id === postId);

    if (!post) {
      return {success: false, message: 'post not found'};
    }

    const comments = this.commentService.findComments(postId);

    const test1 = comments.filter(comment => !comment.commentId).map(c => {
      const subComments = this.commentService.findCommentsByParentId(c.id);
      
      return {...c, subComments}
    })

    const test = comments.map((comment: Comment) => {
        const subComments = this.commentService.findCommentsByParentId(comment.id);

        subComments.forEach(c => comments.splice(comments.indexOf(c), 1));

        return {...comment, subComments}

    }).filter((comment: Comment) => comment); //FIXME 1-depth only

    return {success: true, comments: comments, test: test, test1: test1};
  }

  addComment(id: number, addCommentDto: AddCommentDto, user: any) {
    const post = this.postDB.findOne(p => p.id === id);
    
    if (!post) {
      return {success: false, message: 'post not found'};
    }


    if (addCommentDto.commentId) {
      const commentExist = this.commentService.isCommentExistInPost(id, addCommentDto.commentId)
      if (!commentExist) return {success: false, message: 'comment not found'};
    }

    this.commentService.addComment(id, addCommentDto, user);

    return {success: true};
  }
  
  updateComment(postId: number, commentId: number, updateCommentDto: UpdateCommentDto, user: any) {
    const comment = this.commentService.findComment(commentId);

    if (comment?.postId !== postId || comment?.authorId !== user.sub) {
      return {success: false, message: 'comment not found'};
    }

    comment.content = updateCommentDto.content;

    this.commentService.updateComment(comment);

    return {success: true};
  }

  deleteComment(postId: number, commentId: number, user: any) {
    const comment = this.commentService.findComment(commentId);

    if (comment?.postId !== postId || comment?.authorId !== user.sub) {
      return {success: false, message: 'comment not found'};
    }

    this.commentService.deleteComment(commentId);

    return {success: true};
  }
}
