import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from "../entity/like.entity";
import { Chapter } from '../entity/chapter.entity';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private likesRepository: Repository<Like>,
    ) {}

    create(chapterId: number, userId: number): Promise<Like> {
        let user = new User();
        user.id = userId;
        let chapter = new Chapter();
        chapter.id = chapterId;
        let like = new Like();
        like.user = user;
        like.chapter = chapter;

        return this.likesRepository.save(like);
    }

    remove(like: Like): Promise<any> {
        return this.likesRepository.delete(like);
    }

    findOneBy(chapter: Chapter, userId: number): Promise<Like> {
        return this.likesRepository.findOne(
            {
                where: {
                    chapter: {
                        id: chapter.id
                    },
                    user: {
                        id: userId
                    }
                }
            }
        );
    }

    getLikesAmount(chapter: Chapter): Promise<any> {
        return this.likesRepository
        .createQueryBuilder('like')
        .select('COUNT(like.id)', 'amount')
        .where('like.chapterId = :chapterId', { chapterId: chapter.id })
        .getRawOne();
    }
}