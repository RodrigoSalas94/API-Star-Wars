import { Sequelize } from 'sequelize';
import env from '../config/env';

const database = new Sequelize(env.DB_DATABASE, 'postgres', env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: 'postgres',
});

export default database;
