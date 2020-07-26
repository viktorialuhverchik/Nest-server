import { Request, Body, Controller, Delete, Get, Put, UseGuards, Param, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { StoryService } from './story.service';
import { CommentService } from './comment/comment.service';
import { TagService } from "./tag/tag.service";
import { LikeService } from "./like/like.service";
import { RatingService } from "./rating/rating.service";
import { CreateStoryDto } from './dto/create-story.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Story } from './entity/story.entity';
import { Tag } from "./entity/tag.entity";
import { Comment } from "./entity/comment.entity";
import { Rating } from "./entity/rating.entity";
import { Like } from './entity/like.entity';

@Controller('stories')
export class StoryController {
    constructor(
        private readonly storyService: StoryService,
        private readonly tagService: TagService,
        private readonly commentService: CommentService,
        private readonly ratingService: RatingService,
        private readonly likesService: LikeService
    ) {}

    @Get('all')
    async findAll(@Query('sortBy') sortBy: string) {
        let stories = await this.storyService.findAll();
        stories = await Promise.all(stories.map(async story =>  {
            let amount = 0;
            let ratings = await this.ratingService.findAllByStory(story);

            if (ratings) {
                ratings.forEach(rating => {
                    amount += rating.rating;
                });
            } else {
                ratings = [];
            }
            story.ratingAmount = amount / ratings.length;
            return story;
        }));

        return stories.sort((a,b) => {
            if (sortBy === 'date') {
                return (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt)).getTime();
            }

            if (sortBy === 'rating') {
                return b.ratingAmount - a.ratingAmount;
            }

            return 0;
        });
    }

    @Get(':id')
    async findOne(
        @Param('id') id: number,
        @Query('userId') userId: number
    ) {
        const story = await this.storyService.findOne(id);
        story.chapters = await Promise.all(story.chapters.map(async chapter => {
            if (userId) {
                const like: Like = await this.likesService.findOneBy(chapter, userId);
                chapter.liked = !!like;
            }
            chapter.likesAmount = +(await this.likesService.getLikesAmount(chapter)).amount;
            return chapter;
        }));

        return story;
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

    @UseGuards(JwtAuthGuard)
    @Post(':id/rating')
    async changeRating(
        @Body() ratingDto: CreateRatingDto,
        @Param('id') storyId: number,
        @Request() req
    ) {
        let story = new Story();
        story.id = storyId;
        let oldRating = await this.ratingService.findOneBy(story, req.user);

        if (!oldRating) {
            oldRating = new Rating();
            oldRating.user = req.user;
            oldRating.story = story;
        }

        let rating = Object.assign(oldRating, ratingDto);
        
        return await this.ratingService.createRating(rating);
    }
}

