import express from 'express';
import { DeleteController } from '../controllers/deleteControllers';
import { authenticateToken } from '../middleware/authMiddleware';

const data = express.Router();
const deleteControllers = new DeleteController();

data.delete('/characters', authenticateToken, deleteControllers.deleteCharactersByFilmTitle.bind(deleteControllers));

data.delete('/alldata', authenticateToken, deleteControllers.deleteAllData.bind(deleteControllers));

export default data;
