import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDB } from './entities/post.db';
import { CommentService } from 'src/comment/comment.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from 'src/comment/entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetPostByCategoryQuery } from './dto/get-post-by-category.query';

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
      const posts = this.postDB.findCategoryRecords(query.categoryId, {page, perPage});
      return {posts};
    }

    const posts = this.postDB.findAllPosts({page, perPage});
    return {posts};
  }

  findOne(postId: number) {
    const post = this.postDB.findOne(p => p.id === postId);
    return {post};
  }

  update(postId: number, updatePostDto: UpdatePostDto, user: any) {
    const post = this.postDB.findOne(post => post.authorId === user.sub && post.id === postId);
    if (!post) {
      throw new NotFoundException('post not found');
    }

    if (updatePostDto.title) post.title = updatePostDto.title;
    if (updatePostDto.content) post.content = updatePostDto.content;

    this.postDB.update(post, p => p.id == post.id);
    return {post};
  }

  remove(id: number, user: any) {
    const post = this.postDB.findOne(post => post.id === id && post.authorId === user.sub);
    
    if (!post) {
      throw new NotFoundException('post not found');
    }

    this.postDB.delete(p => p.id === id);
  }

  findComments(postId: number) {
    const post = this.postDB.findOne(p => p.id === postId);

    if (!post) {
      throw new NotFoundException('post not found');
    }

    const comments = this.commentService.findComments(postId).filter(c => !c.commentId);

    const processedComments = this.prepareComments(comments);

    return {comments: processedComments};
  }

  private prepareComments(comments: Comment[]) {
    const prepared = [];
    comments.forEach(c => prepared.push(this.addSubComments(c)));
    return prepared;
  }

  private addSubComments(comment: Comment) {
    const subComments = this.commentService.findCommentsByParentId(comment.id);
    if (subComments.length === 0) {
      return {...comment};
    }

    const preparedSub = this.prepareComments(subComments);
    return {...comment, subComments: preparedSub};
  }

  addComment(postId: number, addCommentDto: AddCommentDto, user: any) {
    const post = this.postDB.findOne(p => p.id === postId);
    
    if (!post) {
      throw new NotFoundException('post not found');
    }


    if (addCommentDto.commentId) {
      const commentExist = this.commentService.isCommentExistInPost(postId, addCommentDto.commentId)
      if (!commentExist) throw new BadRequestException('destination comment not found');
    }

    this.commentService.addComment(postId, addCommentDto, user);
  }
  
  updateComment(postId: number, commentId: number, updateCommentDto: UpdateCommentDto, user: any) {
    const comment = this.commentService.findComment(commentId);

    if (comment?.postId !== postId || comment?.authorId !== user.sub) {
      throw new NotFoundException('comment not found');
    }

    comment.content = updateCommentDto.content;

    this.commentService.updateComment(comment);

    return {comment};
  }

  deleteComment(postId: number, commentId: number, user: any) {
    const comment = this.commentService.findComment(commentId);

    if (comment?.postId !== postId || comment?.authorId !== user.sub) {
      throw new NotFoundException('comment not found');
    }

    this.commentService.deleteComment(commentId);
  }
}
