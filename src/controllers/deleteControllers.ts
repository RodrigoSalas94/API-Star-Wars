import { DeleteService } from '../services/deleteServices';
import { Response, Request, NextFunction } from 'express';

export class DeleteController {
  private deleteService: DeleteService;

  constructor() {
    this.deleteService = new DeleteService();
  }

  async deleteCharactersByFilmTitle(req: Request, res: Response, next: NextFunction) {
    const { filmTitle } = req.body;
    try {
      await this.deleteService.deleteCharactersByFilmTitle(filmTitle);
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar personajes por título de película:', error);
      return next(error);
    }
  }

  async deleteAllData(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteService.deleteAllData();
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar todos los datos de la base de datos:', error);
      return next(error);
    }
  }
}
