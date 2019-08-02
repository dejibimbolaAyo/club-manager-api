// Load .env into process.env
const dotenv = require('dotenv').config();

export const nodeEnv = dotenv.NODE_ENV || 'development';

export const appName = dotenv.APP_NAME || 'Quick server';

export const logStars = (message) => {
    console.info('****************');
    console.info(message);
    console.info('****************');
};

export const jwtSecret = dotenv.JWT_SECRET || '';

export const address =  {
    port: dotenv.PORT || 8000,
    hostname: dotenv.HOSTNAME || 'localhost'
};