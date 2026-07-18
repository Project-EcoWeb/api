import mongoose from "mongoose";
import dotenv from 'dotenv';
import logger from '../logger/logger.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
    .then(() => logger.info(`${new Date().toISOString()}: database connected`))
    .catch(() => logger.info(`${new Date().toISOString()}: database connection failed`));