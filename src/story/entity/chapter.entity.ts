import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Story } from "./story.entity";
import { Like } from "./like.entity";

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

    @ManyToOne(type => Story, story => story.chapters, { onDelete: "CASCADE" })
    story: Story;

    @OneToMany(type => Like, like => like.chapter)
    likes: Like[];

    likesAmount? : number;

    liked? : boolean;
}