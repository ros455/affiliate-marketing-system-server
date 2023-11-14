import moment from 'moment-timezone';

function getRandomLetter() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

export const getMonthFromString = (dateString) => {
    // Розділіть рядок за допомогою точки
    var parts = dateString.split(".");
    // parts[1] тепер містить місяць
    var month = parts[1];
    // Повертаємо місяць
    return month;
  }

  export const getDaysArrayForCurrentMonth = () => {
    // Встановлення часового поясу "Europe/Kiev"
    moment.tz.setDefault('Europe/Kiev');
  
    // Визначення початку та кінця поточного місяця
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');
  
    let daysArray = [];
    let day = startOfMonth;
  
    // Додавання кожного дня місяця до масиву
    while (day <= endOfMonth) {
      daysArray.push(day.format('DD'));
      day = day.clone().add(1, 'day');
    }
  console.log('daysArray',daysArray);
    return daysArray;
  };

  export const getMonthArrayForYear = () => {
  
    let yearArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  
    return yearArray;
  };

  export const getAllPeriodArray = () => {
  
    let yearArray = ['2023','2024','2025','2026','2027','2028','2029','2030'];
  
    return yearArray;
  };

  export const generateRandomLink = (id) => {
    try {
      const dateNow = Date.now().toString();
      const randomString = Math.random().toString(36).substring(2, 15);
      const uniqueString = `${randomString}-${id}-${dateNow}`;
      return uniqueString;
    } catch(error) {
      console.log(error);
    }
  }

  export const generateRandomPromoCode = (id) => {
    try {
      console.log('id',id);
      const partnerId = id.toString();
      const dateNow = Date.now().toString();
      const firstLetter = getRandomLetter();
      const middleLetter = getRandomLetter();
      const endLetter = getRandomLetter();
      // const uniqueString = `${randomString}-${id}-${dateNow}`;
      const uniqueString = `${firstLetter}${partnerId.slice(-3)}${middleLetter}${dateNow.slice(-3)}${endLetter}`;
      console.log('uniqueString',uniqueString);
      return uniqueString;
    } catch(error) {
      console.log(error);
    }
  }
  
  export const getLastSevenDays = () => {
    // Встановлення часового поясу "Europe/Kiev"
    moment.tz.setDefault('Europe/Kiev');
  
    let daysArray = [];
    
    // Визначення вчорашнього дня
    let day = moment().subtract(1, 'days');
  
    // Додавання останніх 7 днів до масиву
    for (let i = 0; i < 7; i++) {
      daysArray.unshift(day.format('DD'));
      day = day.subtract(1, 'days');
    }
  
    console.log('daysArray', daysArray);
    return daysArray;
  };

  // export const getLastSevenDays = () => {
  //   // Встановлення часового поясу "Europe/Kiev"
  //   moment.tz.setDefault('Europe/Kiev');
  
  //   let daysArray = [];
    
  //   // Визначення сьогоднішнього дня
  //   let day = moment();
  
  //   // Додавання сьогоднішнього дня та наступних 6 днів до масиву
  //   for (let i = 0; i < 7; i++) {
  //     daysArray.push(day.format('DD'));
  //     day = day.add(1, 'days');
  //   }
  
  //   console.log('daysArray', daysArray);
  //   return daysArray;
  // };