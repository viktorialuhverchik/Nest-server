import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Story} from "../../story/entity/story.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 250, select: false })
    password: string;

    @Column()
    lastLoginDate: Date;

    @Column()
    registrationDate: Date;

    @Column({ default: false })
    blocked: boolean;

    @OneToMany(type => Story, story => story.user)
    stories: Story[];

    comparePassword(attempt: string): Promise<boolean> {
        return bcrypt.compare(attempt, this.password);
    }

    @BeforeInsert()
    updateDates() {
        this.lastLoginDate = new Date();
        this.registrationDate = new Date();
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}