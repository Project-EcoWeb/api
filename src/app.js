import express from 'express';
import './infra/db/index.js';
import  authRoutes  from './http/routes/authRoutes.js';
import projectRoutes from './http/routes/projectRoutes.js';
import authentication from './http/middlewares/auth.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ isActive: true}));

app.use('/auth', authRoutes);

app.use(authentication);

app.use('/projects', projectRoutes);

export { app };