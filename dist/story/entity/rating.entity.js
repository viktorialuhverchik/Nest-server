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
exports.Rating = void 0;
const typeorm_1 = require("typeorm");
const story_entity_1 = require("./story.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let Rating = class Rating {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Rating.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => story_entity_1.Story, story => story.rating),
    __metadata("design:type", story_entity_1.Story)
], Rating.prototype, "story", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.ratings),
    __metadata("design:type", user_entity_1.User)
], Rating.prototype, "user", void 0);
Rating = __decorate([
    typeorm_1.Entity()
], Rating);
exports.Rating = Rating;
//# sourceMappingURL=rating.entity.js.map