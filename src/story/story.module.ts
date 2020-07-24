import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryController } from "./story.controller";
import { Story } from "./entity/story.entity";
import { StoryService } from "./story.service";
import { Genre } from "./entity/genre.entity";
import { Chapter } from "./entity/chapter.entity";
import { Tag } from "./entity/tag.entity";
import { GenreController } from "./genre/genre.controller";
import { TagController } from './tag/tag.controller';
import { GenreService } from './genre/genre.service';
import { TagService } from './tag/tag.service';
import { CommentService } from './comment/comment.service';
import { Like } from './entity/like.entity';
import { Rating } from './entity/rating.entity';
import { Comment } from './entity/comment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Story, Genre, Chapter, Tag, Like, Rating, Comment
        ])
    ],
    controllers: [StoryController, GenreController, TagController],
    providers: [StoryService, GenreService, TagService, CommentService],
    exports: [StoryService]
})
export class StoryModule {}
