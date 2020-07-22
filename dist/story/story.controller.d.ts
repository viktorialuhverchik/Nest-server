import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './entity/story.entity';
import { TagService } from "./tag/tag.service";
export declare class StoryController {
    private readonly storyService;
    private readonly tagService;
    constructor(storyService: StoryService, tagService: TagService);
    findAll(): Promise<Story[]>;
    findOne(id: number): Promise<Story>;
    create(storyDto: CreateStoryDto, req: any): Promise<Story>;
}
