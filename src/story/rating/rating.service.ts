import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from "../entity/rating.entity";
import { User } from 'src/user/entity/user.entity';
import { Story } from '../entity/story.entity';

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating)
        private ratingRepository: Repository<Rating>,
    ) {}

    findOneBy(story: Story, user: User): Promise<Rating> {
        return this.ratingRepository.findOne(
            {
                relations: ['user', 'story'],
                where: {
                    story: {
                        id: story.id
                    },
                    user: {
                        id: user.id
                    }
                }
            }
        );
    }

    findAllByStory(story: Story): Promise<Rating[]> {
        return this.ratingRepository.find(
            {
                where: {
                    story: {
                        id: story.id
                    }
                }
            }
        );
    }

    createRating(rating: Rating): Promise<Rating> {
        return this.ratingRepository.save(rating);
    }
}