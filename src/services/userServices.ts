import { UserRepository } from '../repositories/userRepository';
import { hashPassword, comparePassword } from '../utils/encryptionUtils';
import { TokenManagent } from '../utils/jwtUtils';
import { UserEmail, UserRegister } from '../models/types/user';
const userRepository = new UserRepository();

export class UserService {
  async registerUser(user: UserRegister): Promise<{ user: UserEmail; token: string }> {
    try {
      const existingUser = await userRepository.findUserByEmail(user.email);
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }

      const hashedPassword = await hashPassword(user.password);

      const newUser = await userRepository.createUser(user.email, hashedPassword);

      const token = TokenManagent.generateToken(newUser.id);

      const userEmail: UserEmail = {
        email: newUser.email,
      };

      return { user: userEmail, token };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }
  async loginUser(User: UserRegister): Promise<{ user: UserEmail; token: string }> {
    try {
      const user = await userRepository.findUserByEmail(User.email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const passwordMatch = await comparePassword(User.password, user.password);
      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
      }

      const token = TokenManagent.generateToken(user.id);

      const userEmail: UserEmail = {
        email: user.email,
      };

      return { user: userEmail, token };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}
