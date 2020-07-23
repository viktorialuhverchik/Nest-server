import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Story } from "./story.entity";
import { User } from "../../user/entity/user.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    text: string;

    @ManyToOne(type => Story, story => story.comments)
    story: Story;

    @ManyToOne(type => User, user => user.comments)
    user: User;
}