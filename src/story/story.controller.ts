import { Request, Body, Controller, Delete, Get, Put, UseGuards, Param, Post } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './entity/story.entity';
import { TagService } from "./tag/tag.service";
import { Tag } from "./entity/tag.entity";

@Controller('stories')
export class StoryController {
    constructor(
        private readonly storyService: StoryService,
        private readonly tagService: TagService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    findAll() {
        return this.storyService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.storyService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(
        @Body() storyDto: CreateStoryDto,
        @Request() req
    ) {
        const tags: string[] = storyDto.tags;
        storyDto.tags = [];
        let story: Story = Object.assign(new Story(), storyDto);
        const promises: Promise<Tag>[] = tags.map(tagName => {
            return this.tagService.findOrCreate(tagName);
        });
        story.user = req.user;
        story.tags = await Promise.all(promises);

        return await this.storyService.create(story);
    }
}

