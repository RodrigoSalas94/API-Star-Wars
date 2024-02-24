import FilmModel from '../models/schemas/filmsModel';
import Character from '../models/schemas/charactersModel';
import { AxiosUtils } from '../utils/axiosUtils';
import { Film } from '../models/types/films';
import { Op } from 'sequelize';
import CharacterModel from '../models/schemas/charactersModel';
import { CharacterApiResponse } from '../models/types/characters';

export class FilmRepository {
  private AxiosUtils: AxiosUtils;

  constructor() {
    this.AxiosUtils = new AxiosUtils();
  }
  async getAllFilmsFromDB(): Promise<Film[]> {
    try {
      return await FilmModel.findAll({ include: [{ model: Character, as: 'characters' }] });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async saveFilmsToDB(filmsData: Film[]): Promise<void> {
    try {
      for (const filmData of filmsData) {
        const film = await FilmModel.create({
          title: filmData.title,
          episode_id: filmData.episode_id,
          opening_crawl: filmData.opening_crawl,
          director: filmData.director,
          producer: filmData.producer,
          release_date: filmData.release_date,
          created: filmData.created,
          edited: filmData.edited,
        });

        const charactersData = await this.getCharactersFromFilmAPI(filmData.url);
        await Promise.all(
          charactersData.map(async (characterUrl) => {
            const response = await this.AxiosUtils.get<CharacterApiResponse>(characterUrl);
            const characterData = response;
            await Character.create({
              name: characterData.name,
              gender: characterData.gender,
              films: [film.title],
              species: characterData.species.join(', '),
              created: new Date(),
              edited: new Date(),
            });
          })
        );
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCharactersFromFilmAPI(filmUrl: string): Promise<string[]> {
    try {
      const response = await this.AxiosUtils.get<{ characters: string[] }>(filmUrl);
      return response.characters;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async saveFilmAndCharactersToDB(filmData: Film): Promise<void> {
    try {
      const film = await FilmModel.create({
        title: filmData.title,
        episode_id: filmData.episode_id,
        opening_crawl: filmData.opening_crawl,
        director: filmData.director,
        producer: filmData.producer,
        release_date: filmData.release_date,
        created: filmData.created,
        edited: filmData.edited,
      });

      const charactersData = await this.getCharactersFromFilmAPI(filmData.url);

      await Promise.all(
        charactersData.map(async (characterUrl) => {
          const response = await this.AxiosUtils.get<CharacterApiResponse>(characterUrl);
          const characterData = response;
          await Character.create({
            name: characterData.name,
            gender: characterData.gender,
            films: [film.title],
            species: characterData.species.join(', '),
            created: new Date(),
            edited: new Date(),
          });
        })
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getFilmDataByIdFromAPI(id: number): Promise<Film | null> {
    try {
      const response = await this.AxiosUtils.get<Film>(`https://swapi.dev/api/films/${id}`);
      return response;
    } catch (error) {
      console.error('Error al obtener datos de película desde la API externa:', error);
      return null;
    }
  }
  async getAllFilmsFromAPI(): Promise<Film[]> {
    try {
      const response = await this.AxiosUtils.get<{ results: Film[] }>('https://swapi.dev/api/films/');
      return response.results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getFilmById(id: number): Promise<Film | null> {
    try {
      return await FilmModel.findOne({ where: { episode_id: id }, include: [{ model: Character, as: 'characters' }] });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchFilmByTitle(title: string): Promise<Film[]> {
    try {
      return await FilmModel.findAll({
        where: {
          title: {
            [Op.like]: '%' + title + '%',
          },
        },
        include: [{ model: Character, as: 'characters' }],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchSpecies(species: string): Promise<Character[]> {
    try {
      return await CharacterModel.findAll({
        where: {
          species: {
            [Op.like]: '%' + species + '%',
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
