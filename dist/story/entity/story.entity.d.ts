import { Genre } from "./genre.entity";
import { Chapter } from "./chapter.entity";
import { Tag } from "./tag.entity";
import { User } from "../../user/entity/user.entity";
import { Rating } from "./rating.entity";
import { Comment } from "./comment.entity";
export declare class Story {
    id: number;
    heading: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    genre: Genre;
    chapters: Chapter[];
    tags: Tag[];
    user: User;
    rating: Rating[];
    comments: Comment[];
    setCreatedAt(): void;
    hashPassword(): void;
}
