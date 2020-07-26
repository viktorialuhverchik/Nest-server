import { Chapter } from "./chapter.entity";
import { User } from '../../user/entity/user.entity';
export declare class Like {
    id: number;
    chapter: Chapter;
    user: User;
}
