import express from 'express';
import routes from './routes/filmsRoutes';
import userRouter from './routes/userRoutes';
import data from './routes/deleteRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import { errorHandler } from './config/error';

const app = express();
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

app.use(express.json());

const dirSwagger = './src/docs/swagger.yml';
const swaggerDocument = YAML.load(dirSwagger);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use([routes, userRouter, data]);

const PORT = process.env.PORT || 1234;

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
