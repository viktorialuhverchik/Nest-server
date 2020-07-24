import { Story } from "./story.entity";
import { User } from "../../user/entity/user.entity";
export declare class Comment {
    id: number;
    text: string;
    createdAt: Date;
    story: Story;
    user: User;
    setCreatedAt(): void;
}
