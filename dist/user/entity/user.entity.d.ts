import { Story } from "../../story/entity/story.entity";
import { Like } from "../../story/entity/like.entity";
import { Rating } from "../../story/entity/rating.entity";
import { Comment } from "../../story/entity/comment.entity";
export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    lastLoginDate: Date;
    registrationDate: Date;
    blocked: boolean;
    stories: Story[];
    likes: Like[];
    ratings: Rating[];
    comments: Comment[];
    comparePassword(attempt: string): Promise<boolean>;
    updateDates(): void;
    hashPassword(): Promise<void>;
}
