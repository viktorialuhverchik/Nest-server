import { Story } from "../../story/entity/story.entity";
export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    lastLoginDate: Date;
    registrationDate: Date;
    blocked: boolean;
    stories: Story[];
    comparePassword(attempt: string): Promise<boolean>;
    updateDates(): void;
    hashPassword(): Promise<void>;
}
