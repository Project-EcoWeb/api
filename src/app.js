import express from 'express';
import './infra/db/index.js';
import  authRoutes  from './http/routes/authRoutes.js';
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ isActive: true}));

app.use('/auth', authRoutes);

export { app };