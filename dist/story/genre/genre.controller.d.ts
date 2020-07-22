import { GenreService } from './genre.service';
import { Genre } from '../entity/genre.entity';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    findAll(): Promise<Genre[]>;
    findOne(id: number): Promise<Genre>;
}
