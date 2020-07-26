import { BadRequestException, Body, Controller, Delete, Get, Post, UseGuards, Param, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Chapter } from '../entity/chapter.entity';
import { LikeService } from '../like/like.service';
import { ChapterService } from './chapter.service';
import { Like } from '../entity/like.entity';

@Controller('chapters')
export class ChapterController {
    constructor(
        private readonly likeService: LikeService,
        private readonly chapterService: ChapterService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post(':id/toggle-like')
    async toggleLike(
        @Body('liked') liked: boolean,
        @Param('id') chapterId: number,
        @Request() req
    ) {
        if (liked) {
            return await this.likeService.create(chapterId, req.user.id);
        } else {
            const chapter: Chapter = await this.chapterService.findOne(chapterId);
            const like: Like = await this.likeService.findOneBy(chapter, req.user.id);
            return await this.likeService.remove(like);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteChapter(@Param('id') chapterId: number,) {
        try {
            return await this.chapterService.deleteChapter(chapterId);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}