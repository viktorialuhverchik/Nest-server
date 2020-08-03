import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    findAll() {
        return this.genreService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.genreService.findOne(id);
    }
}