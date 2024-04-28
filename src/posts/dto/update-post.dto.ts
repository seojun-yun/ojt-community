import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;
}
