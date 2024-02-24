import { DeleteRepository } from '../repositories/deleteRepository';

export class DeleteService {
  private deleteService: DeleteRepository;

  constructor() {
    this.deleteService = new DeleteRepository();
  }

  async deleteCharactersByFilmTitle(filmTitle: string) {
    try {
      await this.deleteService.deleteCharactersByFilmTitle(filmTitle);
    } catch (error) {
      console.error('Error al eliminar personajes por título de película:', error);
      throw error;
    }
  }

  async deleteAllData() {
    try {
      await this.deleteService.deleteAllData();
    } catch (error) {
      console.error('Error al eliminar todos los datos de la base de datos:', error);
      throw error;
    }
  }
}
