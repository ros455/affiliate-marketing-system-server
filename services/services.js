import moment from 'moment-timezone';
import nodemailer from 'nodemailer';

const api_url = 'http://localhost:4444/api/';

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
      const partnerId = id.toString();
      const dateNow = Date.now().toString();
      const firstLetter = getRandomLetter();
      const middleLetter = getRandomLetter();
      const endLetter = getRandomLetter();
      // const uniqueString = `${randomString}-${id}-${dateNow}`;
      const uniqueString = `${firstLetter}${partnerId.slice(-3)}${middleLetter}${dateNow.slice(-3)}${endLetter}`;
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
    return daysArray;
  };

  export const senMailMessage = (email, id, name) => {
    const confirmationLink = `${api_url}activation/${id}`;
    // let transporter = nodemailer.createTransport({
    //   host: 'smtp.ukr.net',
    //   port: 2525,
    //   secure: true,
    //   auth: {
    //     user: 'ros_kichuk@ukr.net',
    //     pass: 'TMqZOHq231x4JkKx'
    //   }
    // });
    let transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: 'info@makenude.ai',
        pass: 'NJyyyoX6J_'
      }
    });
  
    let mailOptions = {
      from: 'info@makenude.ai',
      to: email,
      subject: 'Сonfirmation of registration',
      text: `Hello ${name}`,
      html: 
      `
      <div>
      <h1>Confirm Your Email to Start with MakeNude Affiliate Program</h1>
      <p>Welcome to MakeNude Affiliate Program! Please click the link below to confirm your email and activate your affiliate account:</p>
      <a href=${confirmationLink}>${confirmationLink}</a>
      <p>Thank you for joining us, and we look forward to a successful partnership!</p>
      <p>Best regards,</p>
      <p>MakeNudeAi Team.</p>
      </div>
      `
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
  export const senMailMessageResetPassword = (email, id, name) => {
    return new Promise((resolve, reject) => {
      const confirmationLink = `${api_url}set-new-pass/${id}`;
      // let transporter = nodemailer.createTransport({
      //   host: 'smtp.ukr.net',
      //   port: 2525,
      //   secure: true,
      //   auth: {
      //     user: 'ros_kichuk@ukr.net',
      //     pass: 'TMqZOHq231x4JkKx'
      //   }
      // });
      let transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 465,
        secure: true,
        auth: {
          user: 'info@makenude.ai',
          pass: 'NJyyyoX6J_'
        }
      });
  
      let mailOptions = {
        from: 'info@makenude.ai',
        to: email,
        subject: 'Сonfirmation of registration',
        text: `Hello ${name}`,
        html: 
        `
        <div>
        <h1>Password Reset Instructions for Your MakeNude Affiliate Account</h1>
        <p>I hope this message finds you well. We have received a request to reset the password for your MakeNude Affiliate account associated with this email address. Please be assured that your account security is our top priority.</p>
        <p>To reset your password, please follow the link below. This link will guide you through a straightforward process to create a new password:</p>
        <a href=${confirmationLink}>${confirmationLink}</a>
        <p>If you encounter any issues or need further assistance, do not hesitate to reach out to our customer support team. We are always here to help.</p>
        <p>Thank you for choosing MakeNude. We value your trust and are committed to ensuring the security and confidentiality of your account.</p>
        <p>Best regards.</p>
        </div>
        `
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info.response);
        }
      });
    });
  };