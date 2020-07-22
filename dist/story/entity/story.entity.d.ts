import { Genre } from "./genre.entity";
import { Chapter } from "./chapter.entity";
import { Tag } from "./tag.entity";
import { User } from "../../user/entity/user.entity";
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
    setCreatedAt(): void;
    hashPassword(): void;
}
