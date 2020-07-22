"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entities = void 0;
const user_entity_1 = require("./user/entity/user.entity");
const story_entity_1 = require("./story/entity/story.entity");
const genre_entity_1 = require("./story/entity/genre.entity");
const chapter_entity_1 = require("./story/entity/chapter.entity");
const tag_entity_1 = require("./story/entity/tag.entity");
exports.Entities = [
    user_entity_1.User,
    story_entity_1.Story,
    genre_entity_1.Genre,
    chapter_entity_1.Chapter,
    tag_entity_1.Tag
];
//# sourceMappingURL=entities.js.map