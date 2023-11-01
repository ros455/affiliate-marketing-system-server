import PartnerStatisticModel from '../model/PartnerStatistic.js';
import UserModel from '../model/User.js';
import moment from 'moment-timezone';
import { CronJob } from 'cron';
const kyivTime = moment().tz('Europe/Kiev');
const formattedDate = kyivTime.format('DD.MM.YYYY');
const formattedTime = kyivTime.format('HH:mm');
// const formattedDate = kyivTime.format('30.10.2023');

// const job = new CronJob('19 20 * * *', () => {
//   console.log('Функція виконується щодня о 00:00');
// }, null, true, 'Europe/Kiev');

const codes = [
  {
    codesId: '1',
    date: '02.11.2023',
    code: '112233'
  },
  {
    codesId: '2',
    date: '02.11.2023',
    code: '112233'
  },
  {
    codesId: '3',
    date: '02.11.2023',
    code: '445566'
  },
  {
    codesId: '4',
    date: '02.11.2023',
    code: '445566'
  },
  {
    codesId: '5',
    date: '02.11.2023',
    code: '112233'
  },
]

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

  export const handleLink = async (req, res) => {
    try {
      const { link } = req.query;
      console.log('link',link);
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

  

  // export const handleBuy = async (req, res) => {
  //   try {
  //     const { promotionalСode } = req.body;
  //     console.log('promotionalСode',promotionalСode);
  //     const data = await PartnerStatisticModel.findOne({ promotionalСode });
  //     const time = {date: '28.10.2023'}
  //     if(data) {
  //       data.buys.push(time)
  //       await data.save();
  //       res.status(200).send('succsses');
  //     } else {
  //       res.status(404).send('promotional code not found');
  //     }
  //   } catch(error) {
  //     console.log(error);
  //     res.status(500).json({
  //       message: 'Access denied'
  //     });
  //   }
  // }

  // export const getEventsForCurrentMonth = async (req, res) => {
  //   try {
  //     // Встановіть часовий пояс на Київ
  //     moment.tz.setDefault('Europe/Kiev');
  
  //     // Отримайте поточну дату
  //     const now = moment();
  
  //     // Визначте початок і кінець поточного місяця
  //     const startOfCurrentMonth = now.startOf('month').format('DD.MM.YYYY');
  //     const endOfCurrentMonth = now.endOf('month').format('DD.MM.YYYY');
  
  //     // Знайдіть всі статистики партнерів, які мають події в цьому діапазоні дат
  //     const statistics = await PartnerStatisticModel.find({
  //       'event.date': { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth }
  //     });
  
  //     // Поверніть відфільтровані події
  //     res.json(statistics.map(stat => {
  //       return {
  //         ...stat._doc,
  //         event: stat.event.filter(e => e.date >= startOfCurrentMonth && e.date <= endOfCurrentMonth)
  //       };
  //     }));
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('Internal Server Error');
  //   }
  // }
  

  export const getEventsForCurrentMonth = async (req, res) => {
    try {
      const { id } = req.params;
      console.log('id', id);
  
      // Встановіть часовий пояс на Київ
      moment.tz.setDefault('Europe/Kiev');
  
      // Отримайте поточну дату
      const now = moment();
  
      // Визначте початок і кінець поточного місяця
      const startOfCurrentMonth = now.startOf('month').format('DD.MM.YYYY');
      const endOfCurrentMonth = now.endOf('month').format('DD.MM.YYYY');
  
      // Знайдіть статистику партнера за його ID і діапазон дат
      const statistic = await PartnerStatisticModel.findOne({
        partnerId: id,
        'event.date': { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth }
      });
  
      if (!statistic) {
        return res.status(404).send({ message: 'Statistic not found' });
      }
  
      // Відфільтруйте події за поточний місяць
      const eventsForCurrentMonth = statistic.event.filter(e => e.date >= startOfCurrentMonth && e.date <= endOfCurrentMonth);
  
      // Поверніть відфільтровані події
      res.json(eventsForCurrentMonth);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  export const handleBuy = async () => {
    try {
      for (const item of codes) {
        const partner = await UserModel.findOne({ promotionalCode: item.code });
        console.log('partner', partner);
        if (!partner) {
          console.log('Партнер не знайдений для коду:', item.code);
          continue;
        }

        const partnerId = partner._id;
        const statistic = await PartnerStatisticModel.findOne({ partnerId });
  
        if (!statistic) {
          console.log('Статистика не знайдена для партнера:', partnerId);
          continue;
        }
  
        const lastIndex = statistic.event.length - 1;
        statistic.event[lastIndex].buys.push(`${formattedDate}/${formattedTime}`);
        await statistic.save();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelCalculateAllBuysPartner = async () => {
    try {
      const allPartner = (await UserModel.find()).splice(1);
      console.log('allPartner',allPartner);
      for (const user of allPartner) {
        if (!user._id) {
          console.log('Партнер не знайдений для коду:', user._id);
          continue;
        }
        const partnerId = user._id.toString();
        console.log('partnerId',partnerId);
        const statistic = await PartnerStatisticModel.findOne({ partnerId });

        if (!statistic) {
          console.log('Статистика не знайдена для партнера:', partnerId);
          continue;
        }
        let allBuys = statistic.buysAllPeriod;
        const lastIndex = statistic.event.length - 1;
        let numberBuys = 0; 
        statistic.event[lastIndex].buys.forEach(() => {
          numberBuys++;
        })

        allBuys += numberBuys;
        statistic.buysAllPeriod = allBuys;
        await statistic.save();

        console.log('numberBuys',numberBuys);

      }

    } catch(error) {
      console.log(error);
    }
  }

  const handelCalculateAllClicksPartner = async () => {
    try {
      const allPartner = (await UserModel.find()).splice(1);
      console.log('allPartner',allPartner);
      for (const user of allPartner) {
        if (!user._id) {
          console.log('Партнер не знайдений для коду:', user._id);
          continue;
        }
        const partnerId = user._id.toString();
        console.log('partnerId',partnerId);
        const statistic = await PartnerStatisticModel.findOne({ partnerId });

        if (!statistic) {
          console.log('Статистика не знайдена для партнера:', partnerId);
          continue;
        }
        let allClicks = statistic.clicksAllPeriod;
        const lastIndex = statistic.event.length - 1;
        let numberClicks = 0; 
        statistic.event[lastIndex].clicks.forEach(() => {
          numberClicks++;
        })

        allClicks += numberClicks;
        statistic.clicksAllPeriod = allClicks;
        await statistic.save();

        console.log('numberClicks',numberClicks);

      }

    } catch(error) {
      console.log(error);
    }
  }

  // setTimeout(() => {
  //   handelCalculateAllClicksPartner();
  // },5000)

  // setTimeout(() => {
  //   handelCalculateAllBuysPartner();
  // },5000)

  // setTimeout(() => {
  //   handleBuy();
  // }, 5000);