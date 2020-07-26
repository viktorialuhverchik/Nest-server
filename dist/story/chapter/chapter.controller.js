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
exports.ChapterController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guard/jwt-auth.guard");
const like_service_1 = require("../like/like.service");
const chapter_service_1 = require("./chapter.service");
let ChapterController = class ChapterController {
    constructor(likeService, chapterService) {
        this.likeService = likeService;
        this.chapterService = chapterService;
    }
    async toggleLike(liked, chapterId, req) {
        if (liked) {
            return await this.likeService.create(chapterId, req.user.id);
        }
        else {
            const chapter = await this.chapterService.findOne(chapterId);
            const like = await this.likeService.findOneBy(chapter, req.user.id);
            return await this.likeService.remove(like);
        }
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(':id/toggle-like'),
    __param(0, common_1.Body('liked')),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Number, Object]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "toggleLike", null);
ChapterController = __decorate([
    common_1.Controller('chapters'),
    __metadata("design:paramtypes", [like_service_1.LikeService,
        chapter_service_1.ChapterService])
], ChapterController);
exports.ChapterController = ChapterController;
//# sourceMappingURL=chapter.controller.js.map