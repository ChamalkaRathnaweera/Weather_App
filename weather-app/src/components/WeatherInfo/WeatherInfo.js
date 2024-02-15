import React from 'react';
import './WeatherInfo.css';

const WeatherInfo = ({ data }) => {
  const { name, sys, main, weather, dt, wind, clouds, sys: { sunrise, sunset } } = data;

  const dateOptions = { weekday: 'long', day: '2-digit', month: 'long' };
  const formattedDate = new Date(dt * 1000).toLocaleDateString(undefined, dateOptions);

  const weatherIconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="weather-container">
      <div className="header">
        <h2>{name}, {sys.country}</h2>
        <h4>{formattedDate}</h4>
      </div>
      <div className="details-container">
        <div className="left-column">
          {/* First column with image */}
          <img src={weatherIconUrl} alt="Weather Icon" />
        </div>
        <div className="middle-column">
          {/* Second column with temperature and weather */}
          <h1>{main.temp}°C</h1>
          <h4>{weather[0].main}</h4>
        </div>
        <div className="vertical-line"></div>
        <div className="right-column">
          {/* Third column with details */}
          <div className="right-column">
            <div className="row">
              <div>
                <p>{main.temp_max}°C</p>
                <p className="caption">High</p>
              </div>
              <div>
                <p>{wind.speed} mph</p>
                <p className="caption">Wind</p>
              </div>
              <div>
                <p>{formatTime(sunrise)}</p>
                <p className="caption">Sunrise</p>
              </div>
            </div>
            <div className="row">
              <div>
                <p>{main.temp_min}°C</p>
                <p className="caption">Low</p>
              </div>
              <div>
                <p>{clouds.all}%</p>
                <p className="caption">Rain</p>
              </div>
              <div>
                <p>{formatTime(sunset)}</p>
                <p className="caption">Sunset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
