import mongoose from "mongoose";
import dotenv from 'dotenv';
import logger from '../logger/logger.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URL, {
    auth: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
}})
    .then(() => logger.info(`${new Date().toISOString()}: database connected`))
    .catch(() => logger.info(`${new Date().toISOString()}: database connection failed`));