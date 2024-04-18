export class Comment {
    id: number;
    content: string;
    createdAt: Date;
    postId: number;
    commentId?: number;
    authorId: number;
}