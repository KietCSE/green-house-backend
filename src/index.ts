import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import CentralizedRouter from './presentation/routers/index';
import config from './config/load-config';
import swaggerOptions from './config/swagger'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { connectDB } from './config/prisma-config';
import { errorHandler } from './presentation/middleware/exception';
import { SocketManager } from './adafruit/socket';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Hoặc chỉ định origin cụ thể, ví dụ: ["http://localhost:5500"]
        methods: ["GET", "POST"]
    }
});
const socketManager = new SocketManager(io);
socketManager.setupEventListener();

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


// Main router
app.use('/api', CentralizedRouter);

app.get('/test', (req, res) => {
    SocketManager.broadcaseData("tuankietpro")
})


app.use(errorHandler)

// const port = Number(process.env.PORT) || 3000;
const port = config.PORT;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});