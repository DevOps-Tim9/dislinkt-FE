import { Comment } from "./comment.model";
import { Like } from "./like.model";

export interface Post {
    id: number;
    description: string;
    userId: number;
    imageId: number;
    totalLikes: number;
    totalUnlikes: number;
    likes: Like[];
    comments: Comment[];
}