import React, { useState } from 'react';

import WeatherForm from './components/WeatherForm/WeatherForm';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <div>
      <WeatherForm onWeatherData={handleWeatherData} />
      {weatherData && <WeatherInfo data={weatherData} />}
    </div>
  );
}

export default App;
