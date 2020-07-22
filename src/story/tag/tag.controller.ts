import { BadRequestException, Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { TagService } from './tag.service';
import { Tag } from '../entity/tag.entity';

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get('all')
    findAll() {
        return this.tagService.findAll();
    }
}

