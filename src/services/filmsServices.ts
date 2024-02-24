import { FilmRepository } from '../repositories/filmsRepository';
import { Film } from '../models/types/films';
import CharacterModel from '../models/schemas/charactersModel';

export class FilmService {
  private filmRepository: FilmRepository;

  constructor() {
    this.filmRepository = new FilmRepository();
  }

  async getAllFilms(): Promise<Film[]> {
    try {
      const films = await this.filmRepository.getAllFilmsFromDB();
      if (films.length !== 0) {
        return films;
      }
      const filmsData = await this.filmRepository.getAllFilmsFromAPI();
      await this.filmRepository.saveFilmsToDB(filmsData);
      return filmsData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getFilmById(id: number): Promise<Film | null> {
    try {
      let film = await this.filmRepository.getFilmById(id);

      if (film !== null) {
        return film;
      }

      film = await this.filmRepository.getFilmDataByIdFromAPI(id);
      if (film !== null) {
        await this.filmRepository.saveFilmAndCharactersToDB(film);
        return film;
      } else {
        throw new Error(`No se pudo encontrar la película con el ID ${id}`);
      }
    } catch (error) {
      console.error('Error al obtener la película por ID:', error);
      throw error;
    }
  }

  async searchFilmByTitle(title: string): Promise<Film[]> {
    try {
      return await this.filmRepository.searchFilmByTitle(title);
    } catch (error) {
      console.error('Error al buscar la película por título:', error);
      throw error;
    }
  }

  async searchSpecies(species: string): Promise<CharacterModel[]> {
    try {
      return await this.filmRepository.searchSpecies(species);
    } catch (error) {
      console.error('Error al buscar especies:', error);
      throw error;
    }
  }
}
