export type User = {
  id: number;
  password: string;
  email: string;
};

export type UserRegister = Pick<User, 'email' | 'password'>;
export type UserEmail = Pick<User, 'email'>;
