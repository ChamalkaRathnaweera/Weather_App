import React, { useState, useEffect } from 'react';
import './WeatherForm.css';
import ErrorModal from '../ErrorModal/ErrorModal';

const WeatherForm = ({ onWeatherData }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    setError('');
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude || !isValidLatitude(latitude) || !isValidLongitude(longitude)) {
      setError('Invalid input. Please enter valid latitude and longitude.');
      setShowErrorModal(true);
      return;
    }

    try {
      const apiKey = '33c92b0552e0eea71460739025382726';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch weather data.');
      }

      const data = await response.json();
      onWeatherData(data);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setShowErrorModal(true);
    }
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const isValidLatitude = (lat) => {
    return /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/.test(lat);
  };

  const isValidLongitude = (lon) => {
    return /^-?((1[0-7][0-9])|([1-9]?[0-9]))\.{1}\d{1,6}$/.test(lon);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Lat & Long:
          <input
            type="text"
            value={latitude}
            onChange={handleLatitudeChange}
          />
          <input
            type="text"
            value={longitude}
            onChange={handleLongitudeChange}
          />
        </label>

        <button type="submit" style={{ display: 'none' }}>
          Get Weather
        </button>
      </form>

      {showErrorModal && (
        <ErrorModal message={error} onClose={handleCloseErrorModal} />
      )}
    </div>
  );
};

export default WeatherForm;
