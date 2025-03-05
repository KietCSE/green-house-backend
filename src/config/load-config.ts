import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: Number(process.env.PORT || 3000),
    AIO_USERNAME: String(process.env.AIO_USERNAME),
    AIO_KEY: String(process.env.AIO_KEY),
    AIO_FEED_ID: String(process.env.AIO_FEED_ID)
};

export default config;