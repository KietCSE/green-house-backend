import config from './load-config'
import path from 'path';

const port = config.PORT

// Cấu hình Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Green hourse API documentation',
        },
        servers: [
            {
                url: `http://18.179.39.144/api`, // URL của server
            },
        ],
    },
    apis: [path.resolve(__dirname, '../../docs/*.yml')],
};

export default swaggerOptions;
