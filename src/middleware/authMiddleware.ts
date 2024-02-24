import { Response, NextFunction } from 'express';

import { AuthenticationRequest } from '../models/web/request';
import { TokenManagent } from '../utils/jwtUtils';

export const authenticateToken = (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  const decodedToken = TokenManagent.verifyToken(token);
  if (!decodedToken) {
    return res.status(403).json({ message: 'Token de autenticación inválido' });
  }

  req.user = decodedToken;

  next();
};
