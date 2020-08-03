import { TagService } from './tag.service';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    findAll(): Promise<import("../entity/tag.entity").Tag[]>;
}
