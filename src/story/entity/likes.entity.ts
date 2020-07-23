import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Chapter } from "./chapter.entity";

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Chapter, chapter => chapter.likes)
    chapter: Chapter;
}