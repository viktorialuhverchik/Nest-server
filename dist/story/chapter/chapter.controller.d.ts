import { LikeService } from '../like/like.service';
import { ChapterService } from './chapter.service';
export declare class ChapterController {
    private readonly likeService;
    private readonly chapterService;
    constructor(likeService: LikeService, chapterService: ChapterService);
    toggleLike(liked: boolean, chapterId: number, req: any): Promise<any>;
}
