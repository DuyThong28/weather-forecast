const cron = require("cron");
const nodemailer = require("nodemailer");
const userService = require("../services/userService");
const { convertKphToMps } = require("./vector");
require("dotenv").config();

async function sendEmail() {
  const allUsers = await userService.getAllUsers();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  allUsers.map(async (user) => {
    const email = user.email;
    const city = user.city;
    if (city != null) {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`
      );
      const resData = await response.json();

      const todayData = {
        location: resData.location.name,
        date: resData.location.localtime.slice(0, 10),
        temp: resData.current.temp_c,
        condition: resData.current.condition.text,
        wind: convertKphToMps(resData.current.wind_kph),
        humidity: resData.current.humidity,
      };

      await transporter.sendMail({
        from: `Weather forecast <${process.env.GOOGLE_APP_EMAIL}>`, // sender address
        to: `${email}`, // list of receivers
        subject: "Weather forecast: Daily Forecast Information", // Subject line
        text: "Hello world?", // plain text body
        html: `
                          <p>Hello ${email},</p>
                          <p>This is ${todayData.date} weather forecast in ${city}: </p>
                          <p>Condition : ${todayData.condition}</p>
                          <p>Temperature : ${todayData.temp} &deg;C</p>
                          <p>Wind: ${todayData.wind} M/S</p>
                           <p>Humidity: ${todayData.humidity}% </p>
                          `, // html body
      });
    }
  });
}
// Define the cron expression for midnight: "0 0 * * *"
const cronTime = "0 0 * * *";

const job = new cron.CronJob(cronTime, sendEmail);

module.exports = job;
