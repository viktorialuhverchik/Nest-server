import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Story } from "./story.entity";
import { User } from 'src/user/entity/user.entity';

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Story, story => story.rating)
    story: Story;

    @ManyToOne(type => User, user => user.ratings)
    user: User;
}