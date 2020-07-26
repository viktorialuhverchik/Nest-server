import { Repository } from 'typeorm';
import { Rating } from "../entity/rating.entity";
import { User } from 'src/user/entity/user.entity';
import { Story } from '../entity/story.entity';
export declare class RatingService {
    private ratingRepository;
    constructor(ratingRepository: Repository<Rating>);
    findOneBy(story: Story, user: User): Promise<Rating>;
    findAllByStory(story: Story): Promise<Rating[]>;
    createRating(rating: Rating): Promise<Rating>;
}
