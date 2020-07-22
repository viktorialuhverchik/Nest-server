import { Repository } from 'typeorm';
import { Tag } from "../entity/tag.entity";
export declare class TagService {
    private tagsRepository;
    constructor(tagsRepository: Repository<Tag>);
    findAll(): Promise<Tag[]>;
    findOrCreate(tagName: string): Promise<Tag>;
}
