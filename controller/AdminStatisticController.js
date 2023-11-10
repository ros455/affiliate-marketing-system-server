import AdminStatisticModel from "../model/AdminStatistic.js";
import * as AdminStatisticService from '../services/AdminStatisticService.js';

import { CronJob } from 'cron';
// const jobEveryDay07 = new CronJob('00 05 * * *', () => {
//   AdminStatisticService.calculateEventEveryDay();
//   }, null, true, 'Europe/Kiev');
// const jobEveryDay08 = new CronJob('00 06 * * *', () => {
//   AdminStatisticService.calculateNumbersEveryDay();
//   }, null, true, 'Europe/Kiev');
// const jobEveryDay09 = new CronJob('00 07 * * *', () => {
//   AdminStatisticService.calculateChartMonth();
//   }, null, true, 'Europe/Kiev');

// const jobEveryDay07 = new CronJob('11 00 * * *', () => {
//   AdminStatisticService.calculateEventEveryDay();
//   }, null, true, 'Europe/Kiev');
// const jobEveryDay08 = new CronJob('12 00 * * *', () => {
//   AdminStatisticService.calculateNumbersEveryDay();
//   }, null, true, 'Europe/Kiev');
// const jobEveryDay09 = new CronJob('13 00 * * *', () => {
//   AdminStatisticService.calculateChartMonth();
//   }, null, true, 'Europe/Kiev');

  // Раз на місяць
const jobEveryMonth05 = new CronJob('00 05 02 * *', () => {
  console.log('Функція виконується раз на місяць 01 числа о 00:10');
  AdminStatisticService.calculateChartYear();
}, null, true, 'Europe/Kiev');

  const jobEveryMonth10 = new CronJob('00 15 02 * *', () => {
    console.log('Функція виконується раз на місяць 01 числа о 00:10');
    AdminStatisticService.createDefaultChartMonth();
  }, null, true, 'Europe/Kiev');
  const jobEveryMonth01 = new CronJob('00 01 02 * *', () => {
    console.log('Функція виконується раз на місяць 01 числа о 00:10');
    AdminStatisticService.clearMonthDataAdmin();
  }, null, true, 'Europe/Kiev');
  
  // Раз на рік
  
  const jobEveryYear = new CronJob('00 15 00 2 1 *', () => {
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

// setTimeout(() => {
//   AdminStatisticService.createChartSevenDays();
// },5000)