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
exports.Chapter = void 0;
const typeorm_1 = require("typeorm");
const story_entity_1 = require("./story.entity");
let Chapter = class Chapter {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Chapter.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 200 }),
    __metadata("design:type", String)
], Chapter.prototype, "heading", void 0);
__decorate([
    typeorm_1.Column({ length: 5000 }),
    __metadata("design:type", String)
], Chapter.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Chapter.prototype, "image", void 0);
__decorate([
    typeorm_1.ManyToOne(type => story_entity_1.Story, story => story.chapters),
    __metadata("design:type", story_entity_1.Story)
], Chapter.prototype, "story", void 0);
Chapter = __decorate([
    typeorm_1.Entity()
], Chapter);
exports.Chapter = Chapter;
//# sourceMappingURL=chapter.entity.js.map