import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Story } from "../../story/entity/story.entity";
import { Like } from "../../story/entity/like.entity";
import { Rating } from "../../story/entity/rating.entity";
import { Comment } from "../../story/entity/comment.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 250, select: false })
    password: string;

    @Column()
    lastLoginDate: Date;

    @Column()
    registrationDate: Date;

    @Column({ default: false })
    blocked: boolean;

    @OneToMany(type => Story, story => story.user)
    stories: Story[];

    @OneToMany(type => Like, like => like.user)
    likes: Like[];

    @OneToMany(type => Rating, rating => rating.user)
    ratings: Rating[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];


    comparePassword(attempt: string): Promise<boolean> {
        return bcrypt.compare(attempt, this.password);
    }

    @BeforeInsert()
    updateDates() {
        this.lastLoginDate = new Date();
        this.registrationDate = new Date();
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}