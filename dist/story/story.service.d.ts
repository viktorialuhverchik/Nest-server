import { Repository } from 'typeorm';
import { Story } from "./entity/story.entity";
export declare class StoryService {
    private storyRepository;
    constructor(storyRepository: Repository<Story>);
    findAll(): Promise<Story[]>;
    findOne(id: number): Promise<Story>;
    create(story: Story): Promise<Story>;
}
