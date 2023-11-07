import * as Services from "./services.js";
import PartnerStatisticModel from "../model/PartnerStatistic.js";
import UserModel from "../model/User.js";
import moment from "moment-timezone";
import { CronJob } from "cron";
const kyivTime = moment().tz("Europe/Kiev");
const formattedDate = kyivTime.format("DD.MM.YYYY");

const codes = [
  {
    codesId: "100",
    date: "02.11.2023",
    code: "112233",
  },
  {
    codesId: "101",
    date: "02.11.2023",
    code: "445566",
  },
  {
    codesId: "102",
    date: "02.11.2023",
    code: "112233",
  },
  {
    codesId: "103",
    date: "02.11.2023",
    code: "445566",
  },
];
// Імітація заповнення покупок на основі отриманих данних
// export const handleBuy = async () => {
//   try {
//     for (const item of codes) {
//       const partner = await UserModel.findOne({ promotionalCode: item.code });
//       console.log("partner", partner);
//       if (!partner) {
//         console.log("Партнер не знайдений для коду:", item.code);
//         continue;
//       }

//       const partnerId = partner._id;
//       const statistic = await PartnerStatisticModel.findOne({ partnerId });

//       if (!statistic) {
//         console.log("Статистика не знайдена для партнера:", partnerId);
//         continue;
//       }

//       // const uniqueArrayId = [];

//       // statistic.event.forEach((parent) => {
//       //   parent.buys.forEach((child) => {
//       //     uniqueArrayId.push(child.buyId);
//       //   });
//       // });

//       const uniqueArrayId = [
//         ...new Set(statistic.event.flatMap(parent => parent.buys.map(child => child.buyId)))
//       ];

//       const yesterday = moment().subtract(1, "day").format("DD.MM.YYYY");
//       const yesterdayEvent = statistic.event.filter(
//         (item) => item.date == yesterday
//       );

//       const lastIndex = statistic.event.length - 1;
//       const lastDateToArray = yesterdayEvent[0].date;
//       console.log('yesterdayEvent',yesterdayEvent);
//       const format = "DD.MM.YYYY";
//       const date1 = moment(lastDateToArray, format);
//       const date2 = moment(formattedDate, format);
//       if (date1.isBefore(date2)) {
//         if (!uniqueArrayId.includes(item.codesId)) {
//           statistic.event.push({
//             date: formattedDate,
//             clicks: [],
//             buys: [
//               {
//                 date: formattedDate,
//                 buyId: item.codesId,
//               },
//             ],
//           });
//           await statistic.save();
//         }
//       } else {
//         if (!uniqueArrayId.includes(item.codesId)) {
//           statistic.event[lastIndex].buys.push({
//             date: formattedDate,
//             buyId: item.codesId,
//           });
//           // await statistic.save();
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const handleBuy = async () => {
  try {
    for (const item of codes) {
      const partner = await UserModel.findOne({ promotionalCode: item.code });
      console.log("partner", partner);
      if (!partner) {
        console.log("Партнер не знайдений для коду:", item.code);
        continue;
      }

      const partnerId = partner._id;
      const statistic = await PartnerStatisticModel.findOne({ partnerId });

      if (!statistic) {
        console.log("Статистика не знайдена для партнера:", partnerId);
        continue;
      }

      const uniqueArrayId = [
        ...new Set(statistic.event.flatMap(parent => parent.buys.map(child => child.buyId)))
      ];

      const yesterday = moment().subtract(1, "day").format("DD.MM.YYYY");
      const yesterdayEvent = statistic.event.filter(
        (item) => item.date == yesterday
      );
      console.log('yesterdayEvent',yesterdayEvent);
      if(!yesterdayEvent && !uniqueArrayId.includes(item.codesId)) {
        statistic.event.push({
          date: yesterday,
          clicks: [],
          buys: [{
            date: yesterday,
            buyId: item.codesId
          }]
        })
      }

      if(!uniqueArrayId.includes(item.codesId) && yesterdayEvent) {
        yesterdayEvent[0].buys.push({
          date: yesterday,
          buyId: item.codesId
        })
      }

      await statistic.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCalculateNumbersStatisticsPartner = async () => {
  try {
    const allPartners = (await UserModel.find()).splice(1); // Видалив .splice(1), щоб не пропускати першого користувача.

    for (const user of allPartners) {
      if (!user._id) {
        console.log("Партнер не знайдений для коду:", user._id);
        continue;
      }

      const partnerId = user._id.toString();
      const statistic = await PartnerStatisticModel.findOne({ partnerId });

      if (!statistic) {
        console.log("Статистика не знайдена для партнера:", partnerId);
        continue;
      }

      // Обчислення для покупок
      let allBuys = statistic.buysAllPeriod || 0; // Додавання || 0 для застереження undefined значення
      let monthBuys = statistic.buysMonth || 0;

      // Обчислення для кліків
      let allClicks = statistic.clicksAllPeriod || 0;
      let monthClicks = statistic.clicksMonth || 0;

      const yesterday = moment().subtract(1, "day").format("DD.MM.YYYY");
      const yesterdayEvent = statistic.event.filter(
        (item) => item.date == yesterday
      );

      // Для покупок
      let numberBuys = yesterdayEvent[0].buys.length;
      console.log("numberBuys", numberBuys);
      allBuys += numberBuys;
      monthBuys += numberBuys;

      // Для кліків
      let numberClicks = yesterdayEvent[0].clicks.length;
      console.log("numberClicks", numberClicks);
      allClicks += numberClicks;
      monthClicks += numberClicks;

      // Оновлення статистики
      statistic.buysAllPeriod = allBuys;
      statistic.buysMonth = monthBuys;
      statistic.clicksAllPeriod = allClicks;
      statistic.clicksMonth = monthClicks;

      await statistic.save();
    }
  } catch (error) {
    console.error("Error during statistics calculation for partner:", error);
  }
};

// Очищення числових значень - місяць
export const clearMonthDataAllParthner = async () => {
  try {
    const allPartner = (await UserModel.find()).splice(1);
    console.log("allPartner", allPartner);
    for (const user of allPartner) {
      if (!user._id) {
        console.log("Партнер не знайдений для коду:", user._id);
        continue;
      }
      const partnerId = user._id.toString();
      console.log("partnerId", partnerId);
      const statistic = await PartnerStatisticModel.findOne({ partnerId });
      if (!statistic) {
        console.log("Статистика не знайдена для партнера:", partnerId);
        continue;
      }
      statistic.buysMonth = 0;
      statistic.clicksMonth = 0;
      await statistic.save();
    }
  } catch (error) {
    console.log(error);
  }
};

// Створення місячного графіка

export const fillingCartMonth = async () => {
  try {
    // Встановіть часовий пояс на Київ
    moment.tz.setDefault("Europe/Kiev");

    // Отримайте вчорашню дату
    const yesterday = moment().subtract(1, "day").format("DD.MM.YYYY");

    const allPartner = await UserModel.find();

    for (const user of allPartner) {
      if (!user._id) {
        console.log("Партнер не знайдений для коду:", user._id);
        continue;
      }

      const partnerId = user._id.toString();
      // Знайдіть статистику партнера за його ID та вчорашню дату
      const statistic = await PartnerStatisticModel.findOne({
        partnerId,
      });

      if (!statistic) {
        console.log("Статистика не знайдена для партнера:", partnerId);
        continue;
      }

      const yesterdayEvent = statistic.event.filter(
        (item) => item.date == yesterday
      );
      console.log("yesterdayEvent", yesterdayEvent);
      const clicksNumber = yesterdayEvent[0].clicks.length;
      const buysNumber = yesterdayEvent[0].buys.length;
      console.log('clicksNumber',clicksNumber);
      console.log('buysNumber',buysNumber);
      let conversionsNumber = 0;

      if (buysNumber && clicksNumber) {
        conversionsNumber = (buysNumber / clicksNumber) * 100;
      }
      console.log('work1');
      let entryToUpdateClicks = statistic.chartsMonth.clicks.find(
        (item) => item.date === yesterday
      );
      console.log('work2');
      let entryToUpdateBuys = statistic.chartsMonth.buys.find(
        (item) => item.date === yesterday
      );
      console.log('work3');
      let entryToUpdateConversions = statistic.chartsMonth.conversions.find(
        (item) => item.date === yesterday
      );

      if (entryToUpdateClicks) {
        entryToUpdateClicks.number = clicksNumber;
      }
      if (entryToUpdateBuys) {
        entryToUpdateBuys.number = buysNumber;
      }
      if (entryToUpdateConversions) {
        entryToUpdateConversions.number = conversionsNumber;
      }

      // Після змін, зберігаємо оновлену статистику
      await statistic.save();
    }
  } catch (err) {
    console.error(err);
  }
};

export const createDefaultChartMonth = async () => {
  const daysOfCurrentMonth = Services.getDaysArrayForCurrentMonth();
  const defaultArray = [];
  daysOfCurrentMonth.forEach((item) => {
    defaultArray.push({
      date: item,
      number: 0,
    });
  });
  const allPartner = (await UserModel.find()).splice(1);

  for (const user of allPartner) {
    if (!user._id) {
      console.log("Партнер не знайдений для коду:", user._id);
      continue;
    }

    const partnerId = user._id.toString();
    const statistic = await PartnerStatisticModel.findOne({ partnerId });

    if (!statistic) {
      console.log("Статистика не знайдена для партнера:", partnerId);
      continue;
    }

    statistic.chartsMonth.clicks = defaultArray;
    statistic.chartsMonth.buys = defaultArray;
    statistic.chartsMonth.conversions = defaultArray;
    await statistic.save();
  }
  console.log("daysOfCurrentMonth", daysOfCurrentMonth);
};

export const calculataLastMonthToYearChart = async () => {
  try {
    const allPartner = (await UserModel.find()).splice(1);
    for (const user of allPartner) {
      if (!user._id) {
        console.log("Партнер не знайдений для коду:", user._id);
        continue;
      }
      const partnerId = user._id.toString();
      console.log("partnerId", partnerId);
      const statistic = await PartnerStatisticModel.findOne({ partnerId });
      if (!statistic) {
        console.log("Статистика не знайдена для партнера:", partnerId);
        continue;
      }
      let clicksCurrentMonth = 0;
      let buysCurrentMonth = 0;
      let conversionCurrentMonth = 0;
      let actualDate = statistic.chartsMonth.clicks[0].date;
      let month = Services.getMonthFromString(actualDate);
      statistic.chartsMonth.clicks.forEach((click) => {
        clicksCurrentMonth += click.number;
      });
      statistic.chartsMonth.buys.forEach((buy) => {
        buysCurrentMonth += buy.number;
      });

      if (clicksCurrentMonth && buysCurrentMonth) {
        conversionCurrentMonth = (buysCurrentMonth / clicksCurrentMonth) * 100;
      }

      console.log("clicksCurrentMonth", clicksCurrentMonth);
      console.log("buysCurrentMonth", buysCurrentMonth);
      console.log("conversionCurrentMonth", conversionCurrentMonth);
      statistic.chartsYear.buys.push({
        date: month,
        number: buysCurrentMonth,
      });
      statistic.chartsYear.clicks.push({
        date: month,
        number: clicksCurrentMonth,
      });
      statistic.chartsYear.conversions.push({
        date: month,
        number: conversionCurrentMonth,
      });
      await statistic.save();
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const createDefaultChartYear = async () => {
  const monthCurrentYears = Services.getMonthArrayForYear();
  const defaultArray = [];

  monthCurrentYears.forEach((item) => {
    defaultArray.push({
      date: item,
      number: 0,
    });
  });

  const allPartner = (await UserModel.find()).splice(1);

  for (const user of allPartner) {
    if (!user._id) {
      console.log("Партнер не знайдений для коду:", user._id);
      continue;
    }

    const partnerId = user._id.toString();
    const statistic = await PartnerStatisticModel.findOne({ partnerId });

    if (!statistic) {
      console.log("Статистика не знайдена для партнера:", partnerId);
      continue;
    }

    statistic.chartsYear.clicks = defaultArray;
    statistic.chartsYear.buys = defaultArray;
    statistic.chartsYear.conversions = defaultArray;

    await statistic.save();
  }
};
