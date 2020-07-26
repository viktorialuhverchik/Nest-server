import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRatingDto {
    @IsNumber()
    @IsNotEmpty()
    rating: number;
}