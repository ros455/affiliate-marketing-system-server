import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from './router/UserRouter.js';
import StatisticRouter from './router/StatisticRouter.js';
import AdminStatisticRouter from './router/AdminStatisticRouter.js';
import moment from 'moment-timezone';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static('uploads'));

const kyivTime = moment().tz('Europe/Kiev');
const formattedDate = kyivTime.format('DD.MM.YYYY');
const startTime = moment(kyivTime).set({ hour: 1, minute: 0, second: 0 }).valueOf();
const endTime = moment(kyivTime).set({ hour: 2, minute: 0, second: 0 }).valueOf();
const currentTime = Date.now();

setInterval(() => {
  if (currentTime >= startTime && currentTime <= endTime) {
    
  }
}, 900000);

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB Start");
  });

  app.use('/api',UserRouter);
  app.use('/api',StatisticRouter);
  app.use('/api',AdminStatisticRouter);
  

  app.listen(process.env.PORT, () => {
    console.log('server start', process.env.PORT);
  });