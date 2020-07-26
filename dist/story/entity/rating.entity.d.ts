import { Story } from "./story.entity";
import { User } from 'src/user/entity/user.entity';
export declare class Rating {
    id: number;
    rating: number;
    story: Story;
    user: User;
}
