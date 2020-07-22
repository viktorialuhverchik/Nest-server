import { IsNotEmpty, IsString } from 'class-validator';
import { Genre } from "../entity/genre.entity";
import { Chapter } from "../entity/chapter.entity";

export class CreateStoryDto {
    @IsString()
    @IsNotEmpty()
    heading: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    genre: Genre;

    @IsNotEmpty()
    chapters: Chapter[];

    @IsNotEmpty()
    tags: Array<string>;
}