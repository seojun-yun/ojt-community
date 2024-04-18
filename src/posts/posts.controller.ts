import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Request, Put, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostByCategoryQuery } from './dto/get-post-by-category.query';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Request() request: any) {
    return this.postsService.create(createPostDto, request['user']);
  }

  @Get()
  findAll(@Query() queryParams: GetPostByCategoryQuery){
    return this.postsService.findAll(queryParams);
  }

  @Get(':postId')
  findOne(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.findOne(postId);
  }

  @Put(':postId')
  @UseGuards(AuthGuard)
  update(@Param('postId', ParseIntPipe) postId: number, @Body() updatePostDto: UpdatePostDto, @Request() request: any) {
    return this.postsService.update(postId, updatePostDto, request['user']);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  remove(@Param('postId', ParseIntPipe) postId: number, @Request() request: any) {
    return this.postsService.remove(postId, request['user']);
  }
  
  @Get(':postId/comments')
  getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.findComments(postId);
  }

  @Post(':postId/comments')
  @UseGuards(AuthGuard)
  addComment(@Param('postId', ParseIntPipe) postId: number, @Body() addCommentDto: AddCommentDto, @Request() request: any) {
    return this.postsService.addComment(postId, addCommentDto, request['user']);
  }

  @Put(':postId/comments/:commentId')
  @UseGuards(AuthGuard)
  updateComment(@Param('postId', ParseIntPipe) postId: number, @Param('commentId', ParseIntPipe) commentId: number, @Body() updateCommentDto: UpdateCommentDto, @Request() request: any) {
    return this.postsService.updateComment(postId, commentId, updateCommentDto, request['user']);
  }

  @Delete(':postId/comments/:commentId')
  @UseGuards(AuthGuard)
  deleteComment(@Param('postId', ParseIntPipe) postId: number, @Param('commentId', ParseIntPipe) commentId: number, @Request() request: any) {
    return this.postsService.deleteComment(postId, commentId, request['user'])
  }
}
