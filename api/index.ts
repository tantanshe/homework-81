import express from 'express';
import cors, {CorsOptions} from 'cors';
import * as mongoose from 'mongoose';
import linksRouter from './routers/links';

const app = express();
const port = 8000;

const whitelist = ['http://localhost:8000', 'http://localhost:5173'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/links', linksRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost/link');

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);