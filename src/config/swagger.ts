import config from './load-config'

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
                url: `http://localhost:${port}`, // URL của server
            },
        ],
    },
    apis: ['../../doc/*.yml'],
};

export default swaggerOptions;
