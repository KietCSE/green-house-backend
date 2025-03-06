import express, { Request, Response } from 'express';
import CentralizedRouter from './presentation/routers/index';
import config from './config/load-config';
import swaggerOptions from './config/swagger'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { connectDB } from './config/prisma-config';
import { errorHandler } from './presentation/middleware/exception';

const app = express();
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


// Main router
app.use('/api', CentralizedRouter);



app.use(errorHandler)

// const port = Number(process.env.PORT) || 3000;
const port = config.PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});