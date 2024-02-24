import User from '../models/schemas/usersModel';

export class UserRepository {
   async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw error;
    }
  }
  
  async createUser(email: string, password: string): Promise<User> {
    try {
      return await User.create({ email, password });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }
}



