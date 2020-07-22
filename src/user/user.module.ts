import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from "./entity/user.entity";
import { StoryModule } from '../story/story.module';

@Module({
    imports: [
        StoryModule,
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
