/* eslint-disable react/prop-types */
import "./WeatherItem.scss";

export default function WeatherItem({ data }) {
  return (
    <li className="weather-item">
      <p className="date">{`(${data.date})`}</p>
      <img src={data.icon} />
      <p>{`Temp: ${data.temp}`}&deg;C</p>
      <p>{`Wind: ${data.wind} M/S`}</p>
      <p>{`Humidity: ${data.humidity}%`}</p>
    </li>
  );
}
