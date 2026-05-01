import React from 'react';
import useWeather from './useWeather';
import { CITY_COORDS } from './constants';

const Header = ({ regionName, cityName }) => {
  const coords = CITY_COORDS[cityName] || CITY_COORDS['Sunnyvale'];
  const { weather, loading } = useWeather(coords.lat, coords.lon);

  return (
    <header className="hero-banner">
      <div className="weather-alert-container">
        <div className="weather-alert">
          {loading ? "Loading weather..." : `${cityName} Weather Alert: ${weather.condition}, ${weather.temp}°F`}
        </div>
      </div>
      <h1>Your Adventure, Simplified.</h1>
      <p>SunScout finds the best free splash pads, parks, and libraries near you.</p>
    </header>
  );
};

export default Header;