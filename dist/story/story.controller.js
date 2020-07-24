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
const create_story_dto_1 = require("./dto/create-story.dto");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const story_entity_1 = require("./entity/story.entity");
const tag_service_1 = require("./tag/tag.service");
const comment_entity_1 = require("./entity/comment.entity");
let StoryController = class StoryController {
    constructor(storyService, tagService, commentService) {
        this.storyService = storyService;
        this.tagService = tagService;
        this.commentService = commentService;
    }
    findAll() {
        return this.storyService.findAll();
    }
    findOne(id) {
        return this.storyService.findOne(id);
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
};
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoryController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
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
StoryController = __decorate([
    common_1.Controller('stories'),
    __metadata("design:paramtypes", [story_service_1.StoryService,
        tag_service_1.TagService,
        comment_service_1.CommentService])
], StoryController);
exports.StoryController = StoryController;
//# sourceMappingURL=story.controller.js.map