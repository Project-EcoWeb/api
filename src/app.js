import express from 'express';
import './infra/db/index.js';
import { pinoHttp } from "pino-http";
import swaggerUi from 'swagger-ui-express';
import  authRoutes  from './http/routes/authRoutes.js';
import projectRoutes from './http/routes/projectRoutes.js';
import materialRoutes from './http/routes/materialRoutes.js';
import userRoutes from './http/routes/userRoutes.js';
import authentication from './http/middlewares/auth.js';
import logger from './infra/logger/logger.js';
import HomeController from "./http/controllers/HomeController.js";
import searchRoutes from './http/routes/searchRoutes.js';
import swaggerSpec from "./shared/config/swaggerConfig.js";
import feedbackRoutes from './http/routes/feedbackRoutes.js';
const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.use('/public', express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.json({ isActive: true}));

app.use('/auth', authRoutes);
app.use(authentication);

app.use('/projects', projectRoutes);
app.use('/materials', materialRoutes);
app.get('/home', HomeController.home);
app.use('/users', userRoutes);
app.use('/search', searchRoutes);
app.use('/feedbacks', feedbackRoutes);
export { app };