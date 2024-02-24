import express from 'express';
import { FilmController } from '../controllers/filmsControllers';

const routes = express.Router();
const filmController = new FilmController();

routes.get('/films', filmController.getAllFilms);
routes.get('/films/:id', filmController.getFilmById);
routes.get('/search/:title', filmController.searchFilmByTitle);
routes.get('/search/:species', filmController.searchSpecies);

export default routes;
