import { Repository } from 'typeorm';
import { Genre } from "../entity/genre.entity";
export declare class GenreService {
    private genresRepository;
    constructor(genresRepository: Repository<Genre>);
    findAll(): Promise<Genre[]>;
    findOne(id: number): Promise<Genre>;
}
