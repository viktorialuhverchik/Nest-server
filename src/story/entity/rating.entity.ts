import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Story } from "./story.entity";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Story, story => story.rating)
    story: Story;
}