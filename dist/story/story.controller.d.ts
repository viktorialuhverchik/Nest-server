import { StoryService } from './story.service';
import { CommentService } from './comment/comment.service';
import { TagService } from "./tag/tag.service";
import { LikeService } from "./like/like.service";
import { RatingService } from "./rating/rating.service";
import { CreateStoryDto } from './dto/create-story.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Story } from './entity/story.entity';
import { Comment } from "./entity/comment.entity";
import { Rating } from "./entity/rating.entity";
export declare class StoryController {
    private readonly storyService;
    private readonly tagService;
    private readonly commentService;
    private readonly ratingService;
    private readonly likesService;
    constructor(storyService: StoryService, tagService: TagService, commentService: CommentService, ratingService: RatingService, likesService: LikeService);
    findAll(sortBy: string): Promise<Story[]>;
    findOne(id: number, userId: number): Promise<Story>;
    create(storyDto: CreateStoryDto, req: any): Promise<Story>;
    addComment(commentDto: CreateCommentDto, storyId: number, req: any): Promise<Comment>;
    changeRating(ratingDto: CreateRatingDto, storyId: number, req: any): Promise<Rating>;
    deleteStory(storyId: number): Promise<void>;
}
