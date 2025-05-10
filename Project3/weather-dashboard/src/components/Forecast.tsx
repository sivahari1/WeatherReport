import React from 'react';
import { motion } from 'framer-motion';

interface ForecastProps {
  forecast: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  const getDayName = (dt: number) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center"
          >
            <h4 className="font-medium text-gray-800">{getDayName(day.dt)}</h4>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-16 h-16 mx-auto my-2"
            />
            <p className="text-2xl font-bold text-gray-800">{Math.round(day.main.temp)}°</p>
            <p className="text-sm text-gray-600 capitalize">{day.weather[0].description}</p>
            <div className="mt-2 text-sm text-gray-600">
              <p>Humidity: {day.main.humidity}%</p>
              <p>Wind: {day.wind.speed} m/s</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast; 