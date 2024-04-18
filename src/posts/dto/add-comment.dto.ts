import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddCommentDto {
    
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsInt()
    commentId: number;
}