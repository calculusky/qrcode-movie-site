import { Injectable } from '@nestjs/common';
import { GetMovieDto } from './movie.dto';
import movies from './movie.json';
@Injectable()
export class MovieService {
  constructor() {}

  getMovies(params: GetMovieDto) {
    const movieIndexes = Object.values(params).map((idx) => +idx);

    const filteredMovies = movies
      .filter((movie, index) => movieIndexes.includes(index))
      .map((movie) => ({ title: movie.Title, images: movie.Images }));

    return { movies: filteredMovies };
  }
}
