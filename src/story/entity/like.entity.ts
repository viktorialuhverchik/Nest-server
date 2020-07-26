import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Chapter } from "./chapter.entity";
import { User } from '../../user/entity/user.entity';

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Chapter, chapter => chapter.likes, { onDelete: "CASCADE" })
    chapter: Chapter;

    @ManyToOne(type => User, user => user.likes, { onDelete: "CASCADE" })
    user: User;
}