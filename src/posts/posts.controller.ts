import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Request, Put, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostByCategoryQuery } from './dto/get-post-by-category.query';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/common/decorator/user.decorator';
import { JwtOptionalAuthGuard } from 'src/auth/jwt-optional.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @User() user: any) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @UseGuards(JwtOptionalAuthGuard)
  findAll(@Query() queryParams: GetPostByCategoryQuery, @User() user: any){
    return this.postsService.findAll(queryParams, user);
  }

  @Get(':postId')
  findOne(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.findOne(postId);
  }

  @Put(':postId')
  @UseGuards(JwtAuthGuard)
  update(@Param('postId', ParseIntPipe) postId: number, @Body() updatePostDto: UpdatePostDto, @User() user: any) {
    return this.postsService.update(postId, updatePostDto, user);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('postId', ParseIntPipe) postId: number, @User() user: any) {
    return this.postsService.remove(postId, user);
  }
  
  @Get(':postId/comments')
  @UseGuards(JwtOptionalAuthGuard)
  getComments(@Param('postId', ParseIntPipe) postId: number, @User() user: any) {
    return this.postsService.findComments(postId, user);
  }

  @Post(':postId/comments')
  @UseGuards(JwtAuthGuard)
  addComment(@Param('postId', ParseIntPipe) postId: number, @Body() addCommentDto: AddCommentDto, @User() user: any) {
    return this.postsService.addComment(postId, addCommentDto, user);
  }

  @Put(':postId/comments/:commentId')
  @UseGuards(JwtAuthGuard)
  updateComment(@Param('postId', ParseIntPipe) postId: number, @Param('commentId', ParseIntPipe) commentId: number, @Body() updateCommentDto: UpdateCommentDto, @User() user: any) {
    return this.postsService.updateComment(postId, commentId, updateCommentDto, user);
  }

  @Delete(':postId/comments/:commentId')
  @UseGuards(JwtAuthGuard)
  deleteComment(@Param('postId', ParseIntPipe) postId: number, @Param('commentId', ParseIntPipe) commentId: number, @User() user: any) {
    return this.postsService.deleteComment(postId, commentId, user)
  }
}
