import { Story } from "./story.entity";
import { Likes } from "./likes.entity";
export declare class Chapter {
    id: number;
    heading: string;
    text: string;
    image: string;
    story: Story;
    likes: Likes[];
}
