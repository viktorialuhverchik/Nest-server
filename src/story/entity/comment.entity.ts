import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Story } from "./story.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    text: string;

    @ManyToOne(type => Story, story => story.comments)
    story: Story;
}