import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from "../entity/genre.entity";

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private genresRepository: Repository<Genre>,
    ) {}

    findAll(): Promise<Genre[]> {
        return this.genresRepository.find();
    }
    
    findOne(id: number): Promise<Genre> {
        return this.genresRepository.findOne();
    }
}