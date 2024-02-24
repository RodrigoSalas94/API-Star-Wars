import { Request, Response, NextFunction } from 'express';
import { FilmService } from '../services/filmsServices';
import { error } from 'console';

const filmService = new FilmService();

export class FilmController {
  async getAllFilms(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const films = await filmService.getAllFilms();
      res.json(films);
    } catch (error) {
      return next(error);
    }
  }

  async getFilmById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const filmId = +id;
      const film = await filmService.getFilmById(filmId);
      if (!film) {
        return next(error);
      } else {
        res.json(film);
      }
    } catch (error) {
      return next(error);
    }
  }

  searchFilmByTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const title = req.params.title;
      const films = await filmService.searchFilmByTitle(title);
      res.json(films);
    } catch (error) {
      console.error('Error al buscar la película por título:', error);
      return next(error);
    }
  };

  searchSpecies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const species = req.params.species;
      const characters = await filmService.searchSpecies(species);
      res.json(characters);
    } catch (error) {
      console.error('Error al buscar especies:', error);
      return next(error);
    }
  };
}
