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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Story = void 0;
const typeorm_1 = require("typeorm");
const genre_entity_1 = require("./genre.entity");
const chapter_entity_1 = require("./chapter.entity");
const tag_entity_1 = require("./tag.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let Story = class Story {
    setCreatedAt() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    hashPassword() {
        this.updatedAt = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Story.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 200 }),
    __metadata("design:type", String)
], Story.prototype, "heading", void 0);
__decorate([
    typeorm_1.Column({ length: 500 }),
    __metadata("design:type", String)
], Story.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Story.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Story.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => genre_entity_1.Genre, genre => genre.stories),
    typeorm_1.JoinTable(),
    __metadata("design:type", genre_entity_1.Genre)
], Story.prototype, "genre", void 0);
__decorate([
    typeorm_1.OneToMany(type => chapter_entity_1.Chapter, chapter => chapter.story, { cascade: true }),
    __metadata("design:type", Array)
], Story.prototype, "chapters", void 0);
__decorate([
    typeorm_1.ManyToMany(type => tag_entity_1.Tag),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Story.prototype, "tags", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.stories),
    __metadata("design:type", user_entity_1.User)
], Story.prototype, "user", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Story.prototype, "setCreatedAt", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Story.prototype, "hashPassword", null);
Story = __decorate([
    typeorm_1.Entity()
], Story);
exports.Story = Story;
//# sourceMappingURL=story.entity.js.map