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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const like_entity_1 = require("../entity/like.entity");
const chapter_entity_1 = require("../entity/chapter.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let LikeService = class LikeService {
    constructor(likesRepository) {
        this.likesRepository = likesRepository;
    }
    create(chapterId, userId) {
        let user = new user_entity_1.User();
        user.id = userId;
        let chapter = new chapter_entity_1.Chapter();
        chapter.id = chapterId;
        let like = new like_entity_1.Like();
        like.user = user;
        like.chapter = chapter;
        return this.likesRepository.save(like);
    }
    remove(like) {
        return this.likesRepository.delete(like);
    }
    findOneBy(chapter, userId) {
        return this.likesRepository.findOne({
            where: {
                chapter: {
                    id: chapter.id
                },
                user: {
                    id: userId
                }
            }
        });
    }
    getLikesAmount(chapter) {
        return this.likesRepository
            .createQueryBuilder('like')
            .select('COUNT(like.id)', 'amount')
            .where('like.chapterId = :chapterId', { chapterId: chapter.id })
            .getRawOne();
    }
};
LikeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(like_entity_1.Like)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LikeService);
exports.LikeService = LikeService;
//# sourceMappingURL=like.service.js.map