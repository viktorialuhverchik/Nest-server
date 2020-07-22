import { UserService } from "./user.service";
import { StoryService } from "../story/story.service";
import { User } from "./entity/user.entity";
export declare class UserController {
    private readonly userService;
    private readonly storyService;
    constructor(userService: UserService, storyService: StoryService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    getUserStories(id: number): Promise<import("../story/entity/story.entity").Story[]>;
    updateUsersStatus(users: User[], command: string): Promise<boolean>;
    deleteUsers(users: User[]): Promise<boolean>;
}
