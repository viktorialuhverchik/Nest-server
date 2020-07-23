import { Story } from "./story.entity";
import { Like } from "./like.entity";
export declare class Chapter {
    id: number;
    heading: string;
    text: string;
    image: string;
    story: Story;
    likes: Like[];
}
