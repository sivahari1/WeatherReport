import React from 'react';
import { motion } from 'framer-motion';

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  description,
  icon,
  humidity,
  windSpeed,
  feelsLike
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/20 backdrop-blur-lg rounded-xl p-6 shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{city}</h2>
          <p className="text-gray-600 capitalize">{description}</p>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-16 h-16"
        />
      </div>
      
      <div className="mt-4">
        <div className="text-4xl font-bold text-gray-800">{temperature}°</div>
        <div className="text-sm text-gray-600">Feels like {feelsLike}°</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-lg font-semibold text-gray-800">{humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-lg font-semibold text-gray-800">{windSpeed} m/s</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard; 