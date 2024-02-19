import express from 'express';
import producersRouter from './routes/producers';

const app = express();
app.use(express.json());
app.use('/api', producersRouter);

export default app;
