import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterModule } from './chapter/chapter.module';
import { StoryController } from "./story.controller";
import { GenreController } from "./genre/genre.controller";
import { TagController } from './tag/tag.controller';
import { ChapterController } from './chapter/chapter.controller';
import { Story } from "./entity/story.entity";
import { Genre } from "./entity/genre.entity";
import { Chapter } from "./entity/chapter.entity";
import { Tag } from "./entity/tag.entity";
import { Comment } from './entity/comment.entity';
import { Like } from './entity/like.entity';
import { Rating } from './entity/rating.entity';
import { StoryService } from "./story.service";
import { GenreService } from './genre/genre.service';
import { TagService } from './tag/tag.service';
import { CommentService } from './comment/comment.service';
import { ChapterService } from './chapter/chapter.service';
import { RatingService } from './rating/rating.service';

@Module({
    imports: [
        ChapterModule,
        TypeOrmModule.forFeature([
            Story, Genre, Chapter, Tag, Like, Rating, Comment
        ])
    ],
    controllers: [StoryController, GenreController, TagController, ChapterController],
    providers: [
        StoryService, 
        GenreService, 
        TagService, 
        CommentService, 
        RatingService,
        ChapterService
    ],
    exports: [StoryService, RatingService]
})

export class StoryModule {}