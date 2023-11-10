import PartnerStatisticModel from '../model/PartnerStatistic.js';
import UserModel from '../model/User.js';
import * as ParthnerStatisticService from '../services/ParthnerStatisticService.js';
import moment from 'moment-timezone';
import { CronJob } from 'cron';
const kyivTime = moment().tz('Europe/Kiev');
const formattedDate = kyivTime.format('DD.MM.YYYY');
const formattedTime = kyivTime.format('HH:mm');

// // Кожен день
// const jobEveryDay01 = new CronJob('00 01 * * *', () => {
//   ParthnerStatisticService.handleBuy();
// }, null, true, 'Europe/Kiev');
// const jobEveryDay03 = new CronJob('00 02 * * *', () => {
//   ParthnerStatisticService.handleCalculateNumbersStatisticsPartner();
// }, null, true, 'Europe/Kiev');
// const jobEveryDay05 = new CronJob('00 03 * * *', () => {
//   ParthnerStatisticService.fillingCartMonth();
// }, null, true, 'Europe/Kiev');


// const jobEveryDay01 = new CronJob('39 00 * * *', () => {
//   ParthnerStatisticService.handleBuy();
// }, null, true, 'Europe/Kiev');
// const jobEveryDay03 = new CronJob('40 00 * * *', () => {
//   ParthnerStatisticService.handleCalculateNumbersStatisticsPartner();
// }, null, true, 'Europe/Kiev');
// const jobEveryDay05 = new CronJob('41 00 * * *', () => {
//   ParthnerStatisticService.fillingCartMonth();
// }, null, true, 'Europe/Kiev');

// Раз на місяць
const jobEveryMonth05 = new CronJob('00 05 02 * *', () => {
  console.log('Функція виконується раз на місяць 01 числа о 00:10');
  ParthnerStatisticService.calculataLastMonthToYearChart();
}, null, true, 'Europe/Kiev');

const jobEveryMonth10 = new CronJob('00 10 02 * *', () => {
  console.log('Функція виконується раз на місяць 01 числа о 00:10');
  ParthnerStatisticService.createDefaultChartMonth();
}, null, true, 'Europe/Kiev');

const jobEveryMonth01 = new CronJob('00 01 02 * *', () => {
  console.log('Функція виконується раз на місяць 01 числа о 00:10');
  ParthnerStatisticService.clearMonthDataAllParthner();
}, null, true, 'Europe/Kiev');

// Раз на рік

const jobEveryYear = new CronJob('00 05 00 2 1 *', () => {
  console.log('Функція виконується раз на рік 2 січня о 00:05');
  ParthnerStatisticService.createDefaultChartYear();
}, null, true, 'Europe/Kiev');


export const createPartnerStatistic = async (req, res) => {
    try {
      const {link, partnerId, promotionalСode} = req.body;
      const data = await PartnerStatisticModel.create({
        partnerId,
        link,
        promotionalСode
      })

      res.json(data)
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  } 

  // Подія переходу по посиланню
  export const handleLink = async (req, res) => {
    try {
      const { link } = req.query;
      console.log('link',link);
      console.log('work handle click');
      const partner = await UserModel.findOne({ link });

      if(!partner) {
        return res.status(404).send({message:'partner not found'});
      }

      const partnerId = partner._id;
      const statistic = await PartnerStatisticModel.findOne({partnerId});

      if(!statistic) {
        return res.status(404).send({message:'statistic not found'});
      }

      const lastIndex = statistic.event.length - 1;
      const lastElementArray = statistic.event[lastIndex];
      const lastDate = lastElementArray.date;
      const isBool = lastDate == formattedDate;
      const newObject = {
        date: formattedDate,
        clicks: [`${formattedDate}/${formattedTime}`],
        buys: [],
    }

      if(isBool) {
        statistic.event[lastIndex].clicks.push(`${formattedDate}/${formattedTime}`);
      } else {
        statistic.event.push(newObject)
      }
      await statistic.save();
      res.redirect('https://www.google.com/');

    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  }

  // setTimeout(() => {
  //   ParthnerStatisticService.createChartSevenDays();
  // },5000)