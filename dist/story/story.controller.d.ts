import { StoryService } from './story.service';
import { CommentService } from './comment/comment.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Story } from './entity/story.entity';
import { TagService } from "./tag/tag.service";
import { Comment } from "./entity/comment.entity";
export declare class StoryController {
    private readonly storyService;
    private readonly tagService;
    private readonly commentService;
    constructor(storyService: StoryService, tagService: TagService, commentService: CommentService);
    findAll(): Promise<Story[]>;
    findOne(id: number): Promise<Story>;
    create(storyDto: CreateStoryDto, req: any): Promise<Story>;
    addComment(commentDto: CreateCommentDto, storyId: number, req: any): Promise<Comment>;
}
