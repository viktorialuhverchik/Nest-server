"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chapter_controller_1 = require("./chapter.controller");
const chapter_service_1 = require("./chapter.service");
const chapter_entity_1 = require("../entity/chapter.entity");
const like_service_1 = require("../like/like.service");
const like_entity_1 = require("../entity/like.entity");
let ChapterModule = class ChapterModule {
};
ChapterModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                chapter_entity_1.Chapter, like_entity_1.Like
            ])],
        controllers: [chapter_controller_1.ChapterController],
        providers: [chapter_service_1.ChapterService, like_service_1.LikeService],
        exports: [chapter_service_1.ChapterService, like_service_1.LikeService]
    })
], ChapterModule);
exports.ChapterModule = ChapterModule;
//# sourceMappingURL=chapter.module.js.map