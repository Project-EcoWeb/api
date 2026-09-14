import mongoose from "mongoose";
import dotenv from 'dotenv';
import logger from '../logger/logger.js';

dotenv.config();

const connectionOptions = {};

if (process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) {
    connectionOptions.auth = {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    };
    connectionOptions.authSource = process.env.MONGODB_AUTH_SOURCE || 'admin';
}

mongoose.connect(process.env.MONGODB_URL, connectionOptions)
    .then(() => logger.info(`${new Date().toISOString()}: database connected`))
    .catch(() => logger.info(`${new Date().toISOString()}: database connection failed`));
