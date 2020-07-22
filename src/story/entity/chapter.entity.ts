import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import {Story} from "./story.entity";

@Entity()
export class Chapter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    heading: string;

    @Column()
    text: string;

    @Column()
    image: string;

    @ManyToOne(type => Story, story => story.chapters)
    story: Story;
}