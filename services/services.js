import moment from 'moment-timezone';

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

  export const getMonthArrayForYear= () => {
  
    let yearArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  
    return yearArray;
  };
