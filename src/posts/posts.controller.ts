import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Request, Put } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() request: any) {
    return this.postsService.update(+id, updatePostDto, request['user']);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Request() request: any) {
    return this.postsService.remove(+id, request['user']);
  }
  
  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.postsService.findComments(+id);
  }

  @Post(':id/comments')
  @UseGuards(AuthGuard)
  addComment(@Param('id') id: string, @Body() addCommentDto: AddCommentDto, @Request() request: any) {
    return this.postsService.addComment(+id, addCommentDto, request['user']);
  }

  @Put(':id/comments/:commentId')
  @UseGuards(AuthGuard)
  updateComment(@Param('id') id: string, @Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentDto, @Request() request: any) {
    return this.postsService.updateComment(+id, +commentId, updateCommentDto, request['user']);
  }

  @Delete(':id/comments/:commentId')
  @UseGuards(AuthGuard)
  deleteComment(@Param('id') id: string, @Param('commentId') commentId: string, @Request() request: any) {
    return this.postsService.deleteComment(+id, +commentId, request['user'])
  }
}
