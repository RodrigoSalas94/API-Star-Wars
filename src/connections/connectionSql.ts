import { Pool } from 'pg';

interface Database {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

const db: Database = {
  user: 'postgres',
  host: 'localhost',
  database: 'star_wars',
  password: '142asd182',
  port: 5432,
};
const pool = new Pool(db);
export default pool;
