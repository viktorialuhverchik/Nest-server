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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const story_entity_1 = require("../../story/entity/story.entity");
const like_entity_1 = require("../../story/entity/like.entity");
const rating_entity_1 = require("../../story/entity/rating.entity");
const comment_entity_1 = require("../../story/entity/comment.entity");
let User = class User {
    comparePassword(attempt) {
        return bcrypt.compare(attempt, this.password);
    }
    updateDates() {
        this.lastLoginDate = new Date();
        this.registrationDate = new Date();
    }
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 250, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], User.prototype, "lastLoginDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], User.prototype, "registrationDate", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "blocked", void 0);
__decorate([
    typeorm_1.OneToMany(type => story_entity_1.Story, story => story.user),
    __metadata("design:type", Array)
], User.prototype, "stories", void 0);
__decorate([
    typeorm_1.OneToMany(type => like_entity_1.Like, like => like.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    typeorm_1.OneToMany(type => rating_entity_1.Rating, rating => rating.user),
    __metadata("design:type", Array)
], User.prototype, "ratings", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comment => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "updateDates", null);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map