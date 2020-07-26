import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Story } from "./story.entity";
import { User } from 'src/user/entity/user.entity';

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @ManyToOne(type => Story, story => story.rating, { onDelete: "CASCADE" })
    story: Story;

    @ManyToOne(type => User, user => user.ratings, { onDelete: "CASCADE" })
    user: User;
}