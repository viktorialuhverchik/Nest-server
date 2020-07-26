import { GenreService } from './genre.service';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    findAll(): Promise<import("../entity/genre.entity").Genre[]>;
    findOne(id: number): Promise<import("../entity/genre.entity").Genre>;
}
