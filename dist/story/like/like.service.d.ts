import { Repository } from 'typeorm';
import { Like } from "../entity/like.entity";
import { Chapter } from '../entity/chapter.entity';
export declare class LikeService {
    private likesRepository;
    constructor(likesRepository: Repository<Like>);
    create(chapterId: number, userId: number): Promise<Like>;
    remove(like: Like): Promise<any>;
    findOneBy(chapter: Chapter, userId: number): Promise<Like>;
    getLikesAmount(chapter: Chapter): Promise<any>;
}
