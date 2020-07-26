import { BadRequestException, Body, Controller, Delete, Get, Put, UseGuards, Param } from '@nestjs/common';
import { UserService } from "./user.service";
import { StoryService } from "../story/story.service";
import { RatingService } from 'src/story/rating/rating.service';
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { User } from "./entity/user.entity";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly storyService: StoryService,
        private readonly ratingService: RatingService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/stories')
    async getUserStories(@Param('id') id: number) {
        let stories = await this.storyService.getStoriesByUserId(id);
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
        return stories;
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-status')
    async updateUsersStatus(
        @Body('users') users: User[],
        @Body('command') command: string
    ) {
        try {
            await this.userService.updateUsersStatus(users, command);

            return true;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async deleteUsers(@Body('users') users: User[]) {
        try {
            await this.userService.deleteUsers(users);

            return true;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}

