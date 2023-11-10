import AdminStatisticModel from "../model/AdminStatistic.js";
import PartnerStatisticModel from '../model/PartnerStatistic.js';
import UserModel from '../model/User.js';
import * as Services from './services.js';
import moment from 'moment-timezone';
import { CronJob } from 'cron';
const kyivTime = moment().tz('Europe/Kiev');
const formattedDate = kyivTime.format('DD.MM.YYYY');

// Обчислюємо массив event на основі данних всіх партнерів
export const calculateEventEveryDay = async () => {
    try {
        const allStatistic = await PartnerStatisticModel.find();
        const adminStatistic = await AdminStatisticModel.findOne();
        const yesterday = moment().subtract(1, "day").format("DD.MM.YYYY");
        let eventDate;
        let eventClicks = 0;
        let eventBuys = 0;

        for (const oneStat of allStatistic) {
          const yesterdayEvent = oneStat.event.filter(
            (item) => item.date == yesterday
          );
            console.log('yesterdayEvent',yesterdayEvent);
            const lastEventItem = yesterdayEvent[0];
            eventDate = lastEventItem.date;
            eventClicks += lastEventItem.clicks.length;
            eventBuys += lastEventItem.buys.length;
        }
        adminStatistic.event.push({
            date: eventDate,
            clicksNumber: eventClicks,
            buysNumber: eventBuys
        })
        await adminStatistic.save();
    } catch (error) {
        console.log(error);
    }
}

// Обчислюємо числові значення на основі всх партнерів
export const calculateNumbersEveryDay = async () => {
    try {
        const allStatistic = await PartnerStatisticModel.find();
        const adminStatistic = await AdminStatisticModel.findOne();
        let clickMonth = 0;
        let buyMonth = 0;
        let clickAllPeriod = 0;
        let buyAllPeriod = 0;
        let allConversions = 0;
        for (const oneStat of allStatistic) {
            clickMonth += oneStat.clicksMonth;
            buyMonth += oneStat.buysMonth;
            clickAllPeriod += oneStat.clicksAllPeriod;
            buyAllPeriod += oneStat.buysAllPeriod;
        }
        if(allClicks && allBuys) {
          allConversions = (allBuys / allClicks) * 100;
        }
        adminStatistic.buysMonth = buyMonth;
        adminStatistic.clicksMonth = clickMonth;
        adminStatistic.clicksAllPeriod = clickAllPeriod;
        adminStatistic.buysAllPeriod = buyAllPeriod;
        adminStatistic.conversionAllPeriod = allConversions;

        await adminStatistic.save();
    } catch(error) {
        console.log(error);
    }
}

// Обчислюємо місячний графік
export const calculateChartMonth = async () => {
  try {
    const allStatistic = await PartnerStatisticModel.find();
    const adminStatistic = await AdminStatisticModel.findOne();
    const yesterday = moment().subtract(1, "day").format("DD.MM.YYYY");
    let buysNumber = 0;
    let clicksNumber = 0;
    let conversionsNumber = 0;
    const adminChartYesterdayClickObject =
      adminStatistic.chartsMonth.clicks.filter(
        (item) => item.date == yesterday
      );
    const adminChartYesterdayBuyObject = adminStatistic.chartsMonth.buys.filter(
      (item) => item.date == yesterday
    );
    const adminChartYesterdayConversionObject =
      adminStatistic.chartsMonth.conversions.filter(
        (item) => item.date == yesterday
      );
    for (const oneStat of allStatistic) {
      const yesterdayClickEvent = oneStat.chartsMonth.clicks.filter(
        (item) => item.date == yesterday
      );
      const yesterdayBuyEvent = oneStat.chartsMonth.buys.filter(
        (item) => item.date == yesterday
      );
      // const yesterdayConversionEvent = oneStat.chartsMonth.conversions.filter((item) => item.date == yesterday);
      buysNumber += yesterdayBuyEvent[0].number;
      clicksNumber += yesterdayClickEvent[0].number;
    }
    if (buysNumber && clicksNumber) {
      conversionsNumber = (buysNumber / clicksNumber) * 100;
    }
    if (adminChartYesterdayClickObject) {
      adminChartYesterdayClickObject[0].number = clicksNumber;
    }
    if (adminChartYesterdayBuyObject) {
      adminChartYesterdayBuyObject[0].number = buysNumber;
    }
    if (adminChartYesterdayConversionObject) {
      adminChartYesterdayConversionObject[0].number = conversionsNumber;
    }
    await adminStatistic.save();
  } catch (error) {
    console.log(error);
  }
};

// Обчислюємо річний графік
export const calculateChartYear = async () => {
    try {
        const allStatistic = await PartnerStatisticModel.find();
        const adminStatistic = await AdminStatisticModel.findOne();
        let buysNumber = 0;
        let clicksNumber = 0;
        let conversionsNumber = 0;

        for (const oneStat of allStatistic) {
            const lastIndexForChart = oneStat.chartsYear.buys.length - 1;
            buysNumber += oneStat.chartsYear.buys[lastIndexForChart].number;
            clicksNumber += oneStat.chartsYear.clicks[lastIndexForChart].number;
        }

        if(buysNumber && clicksNumber) {
            conversionsNumber = (buysNumber / clicksNumber) * 100
        }

        adminStatistic.chartsYear.clicks.push({
            date: formattedDate,
            number: clicksNumber
          })

        adminStatistic.chartsYear.buys.push({
            date: formattedDate,
            number: buysNumber
          })

        adminStatistic.chartsYear.conversions.push({
            date: formattedDate,
            number: conversionsNumber
          })
          console.log('buysNumber',buysNumber);
          console.log('clicksNumber',clicksNumber);
          console.log('conversionsNumber',conversionsNumber);
          await adminStatistic.save();
    } catch(error) {
        console.log(error);
    }
}

export const clearMonthDataAdmin = async () => {
  try {
    const allStatistic = await PartnerStatisticModel.find();
    console.log("allPartner", allPartner);

      if (!allStatistic) {
        console.log("Партнер не знайдений для коду:", user._id);
      }

      allStatistic.buysMonth = 0;
      allStatistic.clicksMonth = 0;
      await allStatistic.save();
  } catch (error) {
    console.log(error);
  }
};

export const createDefaultChartMonth = async () => {
    const daysOfCurrentMonth = Services.getDaysArrayForCurrentMonth();
    const defaultArray = [];
    daysOfCurrentMonth.forEach((item) => {
      defaultArray.push({
        date: item,
        number: 0,
      })
    })
    const adminStatistic = await AdminStatisticModel.findOne();
    
      if (!adminStatistic) {
        console.log('Статистика не знайдена');
      }

      console.log('adminStatistic',adminStatistic);
      console.log('defaultArray',defaultArray);

      adminStatistic.chartsMonth.clicks = defaultArray;
      adminStatistic.chartsMonth.buys = defaultArray;
      adminStatistic.chartsMonth.conversions = defaultArray;
      await adminStatistic.save();
  }

  export const createDefaultChartYear = async () => {
    const monthCurrentYears = Services.getMonthArrayForYear();
    const defaultArray = [];

    monthCurrentYears.forEach((item) => {
      defaultArray.push({
        date: item,
        number: 0,
      })
    })

    const statistic = await AdminStatisticModel.findOne();

      if (!statistic) {
        console.log('Статистика не знайдена');
      }

      statistic.chartsYear.clicks = defaultArray;
      statistic.chartsYear.buys = defaultArray;
      statistic.chartsYear.conversions = defaultArray;

      await statistic.save();
  }

  export const createDefaultChartAllPeriod = async () => {
    const monthCurrentYears = Services.getAllPeriodArray();
    const defaultArray = [];

    monthCurrentYears.forEach((item) => {
      defaultArray.push({
        date: item,
        number: 0,
      })
    })

    const statistic = await AdminStatisticModel.findOne();

      if (!statistic) {
        console.log('Статистика не знайдена');
      }

      statistic.chartsYearAllPeriod.clicks = defaultArray;
      statistic.chartsYearAllPeriod.buys = defaultArray;
      statistic.chartsYearAllPeriod.conversions = defaultArray;

      await statistic.save();
  }

  export const createChartSevenDays = async () => {
    try {
      const adminStatistic = await AdminStatisticModel.findOne(); // Ця змінна не використовується у вашому коді
      const allStatistic = await PartnerStatisticModel.find();
  
      // Створюємо новий масив з семи елементів, кожен з яких має date та number
      let newArray = new Array(7).fill(null).map(() => ({ date: '', number: 0 }));
  
      // Перебираємо всі статистики
      for (const oneStat of allStatistic) {
        if (!oneStat) {
          console.log('User not found');
          continue;
        }
  
        // Оновлюємо дані для кожного дня
        oneStat.lastSevenDays.clicks.forEach((dailyStat, index) => {
          newArray[index].number += dailyStat.number;
          newArray[index].date = dailyStat.date; // Припускаючи, що дата однакова для всіх статистик і її треба встановити тільки один раз
        });
      }
      adminStatistic.lastSevenDaysConversions = newArray;
      await adminStatistic.save();
      console.log('newArray', newArray);
  
    } catch (error) {
      console.log(error);
    }
  };