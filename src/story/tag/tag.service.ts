import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from "../entity/tag.entity";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>,
    ) {}

    findAll(): Promise<Tag[]> {
        return this.tagsRepository.find();
    }

    async findOrCreate(tagName: string): Promise<Tag> {
        let tag: Tag = await this.tagsRepository.findOne(
            {
                where: {
                    name: tagName
                }
            }
        );

        if (!tag) {
            tag = new Tag();
            tag.name = tagName;

            tag = await this.tagsRepository.save(tag);
        }

        return tag;
    }
}