import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { Chapter } from "../entity/chapter.entity";
import { LikeService } from '../like/like.service';
import { Like } from '../entity/like.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Chapter, Like
    ])],
    controllers: [ChapterController],
    providers: [ChapterService, LikeService],
    exports: [ChapterService, LikeService]
})
export class ChapterModule {}
