import * as dotenv from 'dotenv';

    dotenv.config();

    // General Configs
    const appConfig = {
        APP_PORT: process.env.APP_PORT
    }

    // MongoDB Configs
    const mongoConfig = {
        MONGODB_URI: process.env.MONGODB_URI
    }

export { appConfig, mongoConfig };



