const { convertKphToMps } = require("../utils/vector");
require("dotenv").config();

const getForecastData = async (req, res) => {
  try {
    const q = req.query?.q || "";
    const days = req.query?.days ? parseInt(req.query.days) + 1 : 5;
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${q}&days=${days}`
    );
    const resData = await response.json();

    const todayData = {
      location: resData.location.name,
      date: resData.location.localtime.slice(0, 10),
      temp: resData.current.temp_c,
      icon: resData.current.condition.icon,
      condition: resData.current.condition.text,
      wind: convertKphToMps(resData.current.wind_kph),
      humidity: resData.current.humidity,
    };

    const forecastData = resData.forecast.forecastday.map((forecastItem) => {
      return {
        date: forecastItem.date,
        temp: forecastItem.day.avgtemp_c,
        icon: forecastItem.day.condition.icon,
        condition: forecastItem.day.condition.text,
        wind: convertKphToMps(forecastItem.day.maxwind_kph),
        humidity: forecastItem.day.avghumidity,
      };
    });

    forecastData.shift();

    res.status(200).json({
      todayData,
      forecastData,
    });
  } catch (e) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
    });
  }
};

const getLocationData = async (req, res) => {
  try {
    const q = req.query?.q || "";
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${q}`
    );
    let resData = await response.json();
    if (resData.length > 3) {
      resData = resData.slice(0, 3);
    }

    const cityData = resData.map((city) => {
      return {
        name: city.name,
        country: city.country,
      };
    });

    res.status(200).json({ cityData });
  } catch (e) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
    });
  }
};
module.exports = {
  getForecastData,
  getLocationData,
};
