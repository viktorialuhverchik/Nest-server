import { Repository } from 'typeorm';
import { Chapter } from "../entity/chapter.entity";
export declare class ChapterService {
    private chapterRepository;
    constructor(chapterRepository: Repository<Chapter>);
    findOne(id: number): Promise<Chapter>;
    deleteChapter(chapterId: number): Promise<void>;
}
