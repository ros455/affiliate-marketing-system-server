import * as Services from "./services.js";
import PartnerStatisticModel from "../model/PartnerStatistic.js";
import UserModel from "../model/User.js";
import moment from "moment-timezone";
import { CronJob } from "cron";
const kyivTime = moment().tz("Europe/Kiev");
const formattedDate = kyivTime.format("DD.MM.YYYY");
const currentYear = kyivTime.format("YYYY");

// const codes = [
//   {
//     codesId: "100",
//     date: "10.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "101",
//     date: "10.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "102",
//     date: "10.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "103",
//     date: "10.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "104",
//     date: "10.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "105",
//     date: "10.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "106",
//     date: "10.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "107",
//     date: "10.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "108",
//     date: "10.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "109",
//     date: "10.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "110",
//     date: "05.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "111",
//     date: "05.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "112",
//     date: "06.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "113",
//     date: "06.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "114",
//     date: "06.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "115",
//     date: "06.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "116",
//     date: "07.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "117",
//     date: "07.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "118",
//     date: "10.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "119",
//     date: "10.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
//   {
//     codesId: "120",
//     date: "10.11.2023",
//     value: 10,
//     code: "e27bh529l",
//   },
//   {
//     codesId: "121",
//     date: "10.11.2023",
//     value: 10,
//     code: "t282w406b",
//   },
// ];
const codes = [
  {
    codesId: "200",
    date: "10.11.2023",
    value: 10,
    code: "l6f2t722e",
  },
  {
    codesId: "201",
    date: "10.11.2023",
    value: 10,
    code: "l6f2t722e",
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
      // const yesterday = '05.11.2023';
      const yesterdayEvent = statistic.event.filter(
        (item) => item.date == yesterday
      );
      if(!yesterdayEvent.length && !uniqueArrayId.includes(item.codesId)) {
        statistic.event.push({
          date: yesterday,
          clicks: [],
          buys: [{
            date: yesterday,
            buyId: item.codesId
          }]
        })
      }

      console.log('yesterdayEvent',yesterdayEvent);

      if(!uniqueArrayId.includes(item.codesId) && yesterdayEvent.length) {
        yesterdayEvent[0].buys.push({
          date: yesterday,
          buyId: item.codesId
        })
      }

      let balanceValue = partner.balance;

      if(!uniqueArrayId.includes(item.codesId)) {
        balanceValue += item.value * (partner.bonus / 100);
        // console.log('balanceValue',balanceValue);
      }
      console.log('balanceValue',balanceValue);
      if(partner.balance != balanceValue) {
        console.log('work not equal');
        partner.balance = balanceValue;
      await partner.save();
      }
      await statistic.save();
    }
  } catch (error) {
    console.log(error);
  }
};

// Обчислення числових значень

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
      let allConversions = 0;
      let monthClicks = statistic.clicksMonth || 0;

      const yesterday = moment().subtract(1, "day").format("DD.MM.YYYY");
      const yesterdayEvent = statistic.event.filter(
        (item) => item.date == yesterday
      );

      if(!yesterdayEvent.length) {
        console.log("Статистика не знайдена");
        continue;
      }

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

      if(allClicks && allBuys) {
        allConversions = (allBuys / allClicks) * 100;
      }
      // Оновлення статистики
      statistic.buysAllPeriod = allBuys;
      statistic.buysMonth = monthBuys;
      statistic.clicksAllPeriod = allClicks;
      statistic.clicksMonth = monthClicks;
      statistic.conversionAllPeriod = allConversions.toFixed(1);

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

// Створення пустого місячного графіка

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

// Наповнення місячного графіка

export const fillingCartMonth = async () => {
  try {
    // Встановіть часовий пояс на Київ
    moment.tz.setDefault("Europe/Kiev");

    // Отримайте вчорашню дату
    let yesterdayFull = moment().subtract(1, "day").format("DD.MM.YYYY");
    const yesterday = yesterdayFull.split('.')[0]


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
        (item) => item.date == yesterdayFull
      );

      if (!yesterdayEvent.length) {
        console.log("Статистика не знайдена");
        continue;
      }

      console.log("yesterdayEvent", yesterdayEvent);
      const clicksNumber = yesterdayEvent[0].clicks.length;
      const buysNumber = yesterdayEvent[0].buys.length;
      console.log('clicksNumber',clicksNumber);
      console.log('buysNumber',buysNumber);
      let conversionsNumber = 0;
      console.log('yesterday',yesterday);
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
      console.log('entryToUpdateClicks',entryToUpdateClicks);
      console.log('entryToUpdateBuys',entryToUpdateBuys);
      console.log('entryToUpdateConversions',entryToUpdateConversions);
      if (entryToUpdateClicks) {
        entryToUpdateClicks.number = clicksNumber;
      }
      if (entryToUpdateBuys) {
        entryToUpdateBuys.number = buysNumber;
      }
      if (entryToUpdateConversions) {
        entryToUpdateConversions.number = conversionsNumber.toFixed(1);
      }

      // Після змін, зберігаємо оновлену статистику
      await statistic.save();
    }
  } catch (err) {
    console.error(err);
  }
};

// Створення пустого річного графіка

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

// Наповнення річного графіка

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
      console.log("conversionCurrentMonth", conversionCurrentMonth.toFixed(1));
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
        number: conversionCurrentMonth.toFixed(1),
      });
      await statistic.save();
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Створення пустого графіка за весь період

export const createDefaultChartAllYears = async () => {
  const monthCurrentYears = Services.getAllPeriodArray();
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

    statistic.chartsYearAllPeriod.clicks = defaultArray;
    statistic.chartsYearAllPeriod.buys = defaultArray;
    statistic.chartsYearAllPeriod.conversions = defaultArray;

    await statistic.save();
  }
};

// Наповнення графіка за весь період

export const calculateChartAllYears = async () => {
  try {
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

      let clicksCurrentYear = statistic.chartsYear.clicks.reduce((acc, current) => acc + current.number, 0);
      let buysCurrentYear = statistic.chartsYear.buys.reduce((acc, current) => acc + current.number, 0);;
      let conversionCurrentYear = 0;

      let actualDate = currentYear;

      let actualBuysItem = statistic.chartsYearAllPeriod.buys.filter((item) => item.date == actualDate);
      let actualClicksItem = statistic.chartsYearAllPeriod.clicks.filter((item) => item.date == actualDate);
      let actualConversionsItem = statistic.chartsYearAllPeriod.conversions.filter((item) => item.date == actualDate);

      if(buysCurrentYear && clicksCurrentYear) {
        conversionCurrentYear = (buysCurrentYear / clicksCurrentYear) * 100;
      }

      actualBuysItem[0].number = buysCurrentYear;
      actualClicksItem[0].number = clicksCurrentYear;
      actualConversionsItem[0].number = conversionCurrentYear.toFixed(1);

      console.log('clicksCurrentYear',clicksCurrentYear);
      console.log('buysCurrentYear',buysCurrentYear);
      console.log('conversionCurrentYear',conversionCurrentYear);

      await statistic.save();

      console.log('actualBuysItem',actualBuysItem);
    }
  } catch(error) {
    console.log('error',error);
  }
};

// Наповнення 7 денного графіка

export const createChartSevenDays = async () => {
  try {
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
      const clicksArray = [];
      const buysArray = [];
      const conversionsArray = [];

      if(!statistic.event.length) {
        console.log("Статистика не знайдена");
        continue;
      }

      const lastSevenDays = statistic.event.slice(-7);

      if(lastSevenDays.length != 7) {
        console.log("Статистики недостатньо");
        continue;
      }
      
      console.log('lastSevenDays',lastSevenDays);
      lastSevenDays.forEach((item) => {
        let iterationConversion = 0;
        let iterationDate = item.date.split('.')[0];
        clicksArray.push({
          date: iterationDate,
          number: item.clicks.length
        })
        buysArray.push({
          date: iterationDate,
          number: item.buys.length
        })

        if(item.buys.length && item.clicks.length) {
          iterationConversion = (item.buys.length / item.clicks.length) * 100;
        }
        conversionsArray.push({
          date: iterationDate,
          number: iterationConversion.toFixed(1)
        })
      })
      statistic.lastSevenDays.clicks = clicksArray;
      statistic.lastSevenDays.buys = buysArray;
      statistic.lastSevenDays.conversions = conversionsArray;

      console.log('clicksArray',clicksArray);
      console.log('buysArray',buysArray);
      console.log('conversionsArray',conversionsArray);
      await statistic.save();
    }
  } catch(error) {
    console.log(error);
  }
}

// Створення пустого місячного графіка для одного партнера

export const createDefaultChartMonthOnePartner = async (id) => {
  const daysOfCurrentMonth = Services.getDaysArrayForCurrentMonth();
  const defaultArray = [];
  daysOfCurrentMonth.forEach((item) => {
    defaultArray.push({
      date: item,
      number: 0,
    });
  });

    const statistic = await PartnerStatisticModel.findById(id);

    if (!statistic) {
      console.log("Статистика не знайдена для партнера:", partnerId);
    }

    statistic.chartsMonth.clicks = defaultArray;
    statistic.chartsMonth.buys = defaultArray;
    statistic.chartsMonth.conversions = defaultArray;
    await statistic.save();
    console.log('DAYS');
};

// Створення пустого річного графіка для одного партнера

export const createDefaultChartYearOnePartner = async (id) => {
  const monthCurrentYears = Services.getMonthArrayForYear();
  const defaultArray = [];

  monthCurrentYears.forEach((item) => {
    defaultArray.push({
      date: item,
      number: 0,
    });
  });

  const statistic = await PartnerStatisticModel.findById(id);

    if (!statistic) {
      console.log("Статистика не знайдена для партнера:", id);
    }

    statistic.chartsYear.clicks = defaultArray;
    statistic.chartsYear.buys = defaultArray;
    statistic.chartsYear.conversions = defaultArray;

    await statistic.save();
    console.log('MONTH');
  };

// Створення пустого графіка за весь період для одного партнера

export const createDefaultChartAllYearsOnePartner = async (id) => {
  const monthCurrentYears = Services.getAllPeriodArray();
  const defaultArray = [];

  monthCurrentYears.forEach((item) => {
    defaultArray.push({
      date: item,
      number: 0,
    });
  });



    const statistic = await PartnerStatisticModel.findById(id);

    if (!statistic) {
      console.log("Статистика не знайдена для партнера:", partnerId);
    }

    statistic.chartsYearAllPeriod.clicks = defaultArray;
    statistic.chartsYearAllPeriod.buys = defaultArray;
    statistic.chartsYearAllPeriod.conversions = defaultArray;

    await statistic.save();
    console.log('YEAR');
};

// Наповнення 7 денного графіка для одного партнера

export const createChartSevenDaysOnePartner = async (id) => {
  try {
    const monthCurrentYears = Services.getLastSevenDays();
    const defaultArray = [];
  
    monthCurrentYears.forEach((item) => {
      defaultArray.push({
        date: item,
        number: 0,
      });
    });
    
    const statistic = await PartnerStatisticModel.findById(id);

      if (!statistic) {
        console.log("Статистика не знайдена для партнера:", partnerId);
      }

      statistic.lastSevenDays.clicks = defaultArray;
      statistic.lastSevenDays.buys = defaultArray;
      statistic.lastSevenDays.conversions = defaultArray;
      await statistic.save();
  } catch(error) {
    console.log(error);
  }
}