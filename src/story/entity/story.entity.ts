import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    BeforeInsert, 
    BeforeUpdate
} from 'typeorm';
import { Genre } from "./genre.entity";
import { Chapter } from "./chapter.entity";
import { Tag } from "./tag.entity";
import { User } from "../../user/entity/user.entity";
import { Rating } from "./rating.entity";
import { Comment } from "./comment.entity";


@Entity()
export class Story {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    heading: string;

    @Column({ length: 500 })
    description: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(type => Genre, genre => genre.stories, { onDelete: "SET NULL" })
    @JoinTable()
    genre: Genre;

    @OneToMany(type => Chapter, chapter => chapter.story, { cascade: true })
    chapters: Chapter[];

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(type => User, user => user.stories, { onDelete: "CASCADE" })
    user: User;

    @OneToMany(type => Rating, rating => rating.story)
    rating: Rating[];

    @OneToMany(type => Comment, comments => comments.story)
    comments: Comment[];

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    hashPassword() {
        this.updatedAt = new Date();
    }

    ratingAmount? : number;
}