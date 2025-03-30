import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: Number(process.env.PORT || 3000),
    AIO_USERNAME: String(process.env.AIO_USERNAME),
    AIO_KEY: String(process.env.AIO_KEY),
    AIO_FEED_ID: String(process.env.AIO_FEED_ID),
    AIO_URL: String(process.env.AIO_URL),
    EMAIL_PWD: String(process.env.EMAIL_PWD),
    EMAIL_USER: String(process.env.EMAIL_USER)
};

export default config;