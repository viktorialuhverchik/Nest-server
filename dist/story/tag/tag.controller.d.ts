import { TagService } from './tag.service';
import { Tag } from '../entity/tag.entity';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    findAll(): Promise<Tag[]>;
}
