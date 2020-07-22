import { Genre } from "../entity/genre.entity";
import { Chapter } from "../entity/chapter.entity";
export declare class CreateStoryDto {
    heading: string;
    description: string;
    genre: Genre;
    chapters: Chapter[];
    tags: Array<string>;
}
