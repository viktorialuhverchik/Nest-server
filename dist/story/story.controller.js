"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const story_service_1 = require("./story.service");
const comment_service_1 = require("./comment/comment.service");
const tag_service_1 = require("./tag/tag.service");
const like_service_1 = require("./like/like.service");
const rating_service_1 = require("./rating/rating.service");
const create_story_dto_1 = require("./dto/create-story.dto");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const create_rating_dto_1 = require("./dto/create-rating.dto");
const story_entity_1 = require("./entity/story.entity");
const comment_entity_1 = require("./entity/comment.entity");
const rating_entity_1 = require("./entity/rating.entity");
let StoryController = class StoryController {
    constructor(storyService, tagService, commentService, ratingService, likesService) {
        this.storyService = storyService;
        this.tagService = tagService;
        this.commentService = commentService;
        this.ratingService = ratingService;
        this.likesService = likesService;
    }
    async findAll(sortBy) {
        let stories = await this.storyService.findAll();
        stories = await Promise.all(stories.map(async (story) => {
            let amount = 0;
            let ratings = await this.ratingService.findAllByStory(story);
            if (ratings) {
                ratings.forEach(rating => {
                    amount += rating.rating;
                });
            }
            else {
                ratings = [];
            }
            story.ratingAmount = amount / ratings.length;
            return story;
        }));
        return stories.sort((a, b) => {
            if (sortBy === 'date') {
                return (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt)).getTime();
            }
            if (sortBy === 'rating') {
                return b.ratingAmount - a.ratingAmount;
            }
            return 0;
        });
    }
    async findOne(id, userId) {
        const story = await this.storyService.findOne(id);
        story.chapters = await Promise.all(story.chapters.map(async (chapter) => {
            if (userId) {
                const like = await this.likesService.findOneBy(chapter, userId);
                chapter.liked = !!like;
            }
            chapter.likesAmount = +(await this.likesService.getLikesAmount(chapter)).amount;
            return chapter;
        }));
        return story;
    }
    async create(storyDto, req) {
        const tags = storyDto.tags;
        storyDto.tags = [];
        let story = Object.assign(new story_entity_1.Story(), storyDto);
        const promises = tags.map(tagName => {
            return this.tagService.findOrCreate(tagName);
        });
        story.user = req.user;
        story.tags = await Promise.all(promises);
        return await this.storyService.create(story);
    }
    async addComment(commentDto, storyId, req) {
        let story = new story_entity_1.Story();
        story.id = storyId;
        let comment = Object.assign(new comment_entity_1.Comment(), commentDto);
        comment.user = req.user;
        comment.story = story;
        return await this.commentService.addComment(comment);
    }
    async changeRating(ratingDto, storyId, req) {
        let story = new story_entity_1.Story();
        story.id = storyId;
        let oldRating = await this.ratingService.findOneBy(story, req.user);
        if (!oldRating) {
            oldRating = new rating_entity_1.Rating();
            oldRating.user = req.user;
            oldRating.story = story;
        }
        let rating = Object.assign(oldRating, ratingDto);
        return await this.ratingService.createRating(rating);
    }
    async deleteStory(storyId) {
        try {
            return await this.storyService.deleteStory(storyId);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
};
__decorate([
    common_1.Get('all'),
    __param(0, common_1.Query('sortBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Query('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_story_dto_1.CreateStoryDto, Object]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(':id/comment'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, Number, Object]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "addComment", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(':id/rating'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rating_dto_1.CreateRatingDto, Number, Object]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "changeRating", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "deleteStory", null);
StoryController = __decorate([
    common_1.Controller('stories'),
    __metadata("design:paramtypes", [story_service_1.StoryService,
        tag_service_1.TagService,
        comment_service_1.CommentService,
        rating_service_1.RatingService,
        like_service_1.LikeService])
], StoryController);
exports.StoryController = StoryController;
//# sourceMappingURL=story.controller.js.map