import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { Story } from "./story.entity";
import { User } from "../../user/entity/user.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    text: string;

    @Column()
    createdAt: Date;

    @ManyToOne(type => Story, story => story.comments, { onDelete: "CASCADE" })
    story: Story;

    @ManyToOne(type => User, user => user.comments, { onDelete: "CASCADE" })
    user: User;

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
    }
}