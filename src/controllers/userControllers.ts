import { UserService } from '../services/userServices';
import { Response, Request, NextFunction } from 'express';

export class UserController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const registrateService = new UserService();
      const result = await registrateService.registerUser(userData);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const loginService = new UserService();
      const result = await loginService.loginUser(userData);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return next(error);
    }
  }
}
