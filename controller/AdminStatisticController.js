import AdminStatisticModel from "../model/AdminStatistic.js";
import ImageStorageModel from "../model/ImageStorage.js";
import UserModel from '../model/User.js';
import * as AdminStatisticService from '../services/AdminStatisticService.js';

import { CronJob } from 'cron';
const jobEveryDay05 = new CronJob('05 00 * * *', () => {
  AdminStatisticService.calculateEventEveryDay();
  }, null, true, 'Europe/Kiev');
const jobEveryDay06 = new CronJob('06 00 * * *', () => {
  AdminStatisticService.calculateNumbersEveryDay();
  }, null, true, 'Europe/Kiev');
const jobEveryDay07 = new CronJob('07 00 * * *', () => {
  AdminStatisticService.calculateChartMonth();
  }, null, true, 'Europe/Kiev');
const jobEveryDay08 = new CronJob('08 00 * * *', () => {
  AdminStatisticService.createChartSevenDays();
  }, null, true, 'Europe/Kiev');

  // Раз на місяць
  const jobEveryMonth01 = new CronJob('01 00 02 * *', () => {
    console.log('Функція виконується раз на місяць 01 числа о 00:10');
    AdminStatisticService.clearMonthDataAdmin();
  }, null, true, 'Europe/Kiev');

const jobEveryMonth013 = new CronJob('13 00 02 * *', () => {
  console.log('Функція виконується раз на місяць 01 числа о 00:10');
  AdminStatisticService.calculateChartYear();
}, null, true, 'Europe/Kiev');

  const jobEveryMonth14 = new CronJob('14 00 02 * *', () => {
    console.log('Функція виконується раз на місяць 01 числа о 00:10');
    AdminStatisticService.createDefaultChartMonth();
  }, null, true, 'Europe/Kiev');
  
  // Раз на рік
  
  const jobEveryYear17 = new CronJob('17 00 00 2 1 *', () => {
    console.log('Функція виконується раз на рік 2 січня о 00:05');
    AdminStatisticService.createDefaultChartYear();
  }, null, true, 'Europe/Kiev');

  const jobEveryYear18 = new CronJob('18 00 00 2 1 *', () => {
    console.log('Функція виконується раз на рік 2 січня о 00:05');
    AdminStatisticService.createDefaultChartYear();
  }, null, true, 'Europe/Kiev');
  
// Створення статистики для адміна
export const createAdminStatistic = async (req, res) => {
    try {
        const date = await AdminStatisticModel.create({})
        res.json(date)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Access denied'
          });
    }
}

export const getAdminStatistic = async (req, res) => {
    try {
        const date = await AdminStatisticModel.find();
        res.json(date)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Access denied'
          });
    }
}

export const createImageStorage = async (req, res) => {
  try {
    const storege = await ImageStorageModel.create({
      BigBanner: '',
      MiddleBanner: '',
      SmallBanner: '',
    });

    res.json(storege);
  }catch(error) {
    console.log(error);
    res.status(500).json({
        message: 'Upload Error'
      });
  }
}

export const UploadBigBaner = async (req, res) => {
  try {
    const storege = await ImageStorageModel.findOne();

    storege.BigBanner = `/uploads/${req.file.originalname}`;

    await storege.save();
    res.json(storege);
  }catch(error) {
    console.log(error);
    res.status(500).json({
        message: 'Upload Error'
      });
  }
}

export const UploadMiddleBaner = async (req, res) => {
  try {
    const storege = await ImageStorageModel.findOne();

    storege.MiddleBanner = `/uploads/${req.file.originalname}`;

    await storege.save();
    res.json(storege);
  }catch(error) {
    console.log(error);
    res.status(500).json({
        message: 'Upload Error'
      });
  }
}

export const UploadSmallBaner = async (req, res) => {
  try {
    const storege = await ImageStorageModel.findOne();

    storege.SmallBanner = `/uploads/${req.file.originalname}`;

    await storege.save();
    res.json(storege);
  }catch(error) {
    console.log(error);
    res.status(500).json({
        message: 'Upload Error'
      });
  }
}

export const getOneUserForAdmin = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await UserModel.findById(id).populate('statistics');
    res.json(user);
  } catch(error) {
    console.log(error);
    res.status(404).json({
        message: 'User not found'
      });
  }
}

// setTimeout(() => {
//   AdminStatisticService.createChartSevenDays();
// },5000)