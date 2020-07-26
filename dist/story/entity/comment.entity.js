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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const story_entity_1 = require("./story.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let Comment = class Comment {
    setCreatedAt() {
        this.createdAt = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 500 }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => story_entity_1.Story, story => story.comments, { onDelete: "CASCADE" }),
    __metadata("design:type", story_entity_1.Story)
], Comment.prototype, "story", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.comments, { onDelete: "CASCADE" }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Comment.prototype, "setCreatedAt", null);
Comment = __decorate([
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map