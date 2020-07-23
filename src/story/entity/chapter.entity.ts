import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Story } from "./story.entity";
import { Likes } from "./likes.entity";

@Entity()
export class Chapter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    heading: string;

    @Column({ length: 10000 })
    text: string;

    @Column()
    image: string;

    @ManyToOne(type => Story, story => story.chapters)
    story: Story;

    @OneToMany(type => Likes, likes => likes.chapter)
    likes: Likes[];
}