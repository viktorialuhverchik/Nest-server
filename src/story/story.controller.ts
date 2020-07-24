import { Request, Body, Controller, Delete, Get, Put, UseGuards, Param, Post } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { StoryService } from './story.service';
import { CommentService } from './comment/comment.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Story } from './entity/story.entity';
import { TagService } from "./tag/tag.service";
import { Tag } from "./entity/tag.entity";
import { Comment } from "./entity/comment.entity";

@Controller('stories')
export class StoryController {
    constructor(
        private readonly storyService: StoryService,
        private readonly tagService: TagService,
        private readonly commentService: CommentService
    ) {}

    @Get('all')
    findAll() {
        return this.storyService.findAll();
    }

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

    @UseGuards(JwtAuthGuard)
    @Post(':id/comment')
    async addComment(
        @Body() commentDto: CreateCommentDto,
        @Param('id') storyId: number,
        @Request() req
    ) {
        let story = new Story();
        story.id = storyId;
        let comment = Object.assign(new Comment(), commentDto);
        comment.user = req.user;
        comment.story = story;

        return await this.commentService.addComment(comment);
    }
}

