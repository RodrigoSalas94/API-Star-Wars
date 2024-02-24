import Character from '../models/schemas/charactersModel';
import Film from '../models/schemas/filmsModel';
import { Op } from 'sequelize';

export class DeleteRepository {
  async deleteCharactersByFilmTitle(filmTitle: string) {
    try {
      await Character.destroy({ where: { films: { [Op.contains]: [filmTitle] } } });

      console.log('Personajes eliminados exitosamente');
    } catch (error) {
      console.error('Error al eliminar personajes:', error);
      throw error;
    }
  }

  async deleteAllData() {
    try {
      await Promise.all([Film.destroy({ where: {} }), Character.destroy({ where: {} })]);
      console.log('Todos los datos fueron eliminados exitosamente');
    } catch (error) {
      console.error('Error al borrar todos los datos de la base de datos:', error);
      throw error;
    }
  }
}
