import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from "../entity/chapter.entity";

@Injectable()
export class ChapterService {
    constructor(
        @InjectRepository(Chapter)
        private chapterRepository: Repository<Chapter>,
    ) {}

    findOne(id: number): Promise<Chapter> {
        return this.chapterRepository.findOne(id);
    }

    async deleteChapter(chapterId: number): Promise<void> {
        await this.chapterRepository
            .createQueryBuilder('chapter')
            .delete()
            .where("id = :chapterId", { chapterId })
            .execute();
    }
}