import express from 'express';


const app = express();

app.use(express.json());
app.get('/', (req, res) => res.json({ isActive: true}));


export { app };