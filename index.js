import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from './router/UserRouter.js';
import StatisticRouter from './router/StatisticRouter.js';
import AdminStatisticRouter from './router/AdminStatisticRouter.js';
import PaymantsMethodRouter from './router/PaymantsMethodRouter.js';
import PaymentRequestRouter from './router/PaymentRequestRouter.js';

dotenv.config();

const app = express();

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3000',
    'https://affiliate-marketing-system-client.vercel.app'
  ]
}));
app.use(express.json());
app.use('/api/uploads', express.static('uploads'));


mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB Start");
  });

  app.use('/api',UserRouter);
  app.use('/api',StatisticRouter);
  app.use('/api',AdminStatisticRouter);
  app.use('/api',PaymantsMethodRouter);
  app.use('/api',PaymentRequestRouter);
  

  app.listen(process.env.PORT, () => {
    console.log('server start', process.env.PORT);
  });