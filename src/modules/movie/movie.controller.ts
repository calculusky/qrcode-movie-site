import { Controller, Get, Query, Render, ValidationPipe } from '@nestjs/common';
import { GetMovieDto } from './movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @Render('movies')
  getMovies(@Query(ValidationPipe) params: GetMovieDto) {
    return this.movieService.getMovies(params);
  }
}
