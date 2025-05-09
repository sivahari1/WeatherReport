import React from 'react';
import { motion } from 'framer-motion';
import { HourlyForecast as HourlyForecastType } from '../services/weatherService';

interface HourlyForecastProps {
  forecast: HourlyForecastType[];
  units: 'metric' | 'imperial';
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast, units }) => {
  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {forecast.map((hour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center bg-white bg-opacity-30 rounded-lg p-3 min-w-[100px]"
            >
              <span className="text-sm font-medium text-gray-700">{hour.time}</span>
              <span className="text-2xl my-1">{hour.icon}</span>
              <span className="text-lg font-semibold text-gray-800">
                {hour.temp}°{units === 'metric' ? 'C' : 'F'}
              </span>
              <div className="text-xs text-gray-600 mt-1 text-center">
                <div className="flex items-center space-x-1">
                  <span>💨</span>
                  <span>{Math.round(hour.wind_speed * 3.6)} {units === 'metric' ? 'km/h' : 'mph'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🧭</span>
                  <span>{getWindDirection(hour.wind_direction)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>💧</span>
                  <span>{hour.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🌧️</span>
                  <span>{hour.precipitation}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast; 