import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { systemRouter } from './routes/system';
import { CONFIG } from './config/constants';
import { router } from './routes/router';
import { tinyRouter } from './routes/clip';

const app = express();
const PORT = CONFIG.PORT || 9000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/', systemRouter);
app.use('/', tinyRouter);
app.use('/', router);

// Init server
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});

export default app;
