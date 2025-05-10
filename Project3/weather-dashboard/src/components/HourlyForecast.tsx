import React from 'react';
import { motion } from 'framer-motion';

interface HourlyForecastProps {
  hourlyData: {
    time: string;
    temp: number;
    icon: string;
    description: string;
    windSpeed: number;
    precipitation: number;
  }[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {hourlyData.map((hour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center min-w-[100px] bg-white/20 rounded-lg p-3"
            >
              <span className="text-gray-700 font-medium">{hour.time}</span>
              <span className="text-3xl my-2">{hour.icon}</span>
              <span className="text-xl font-light text-gray-800">{hour.temp}°C</span>
              <span className="text-sm text-gray-600 mt-1">{hour.description}</span>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span>💨 {hour.windSpeed} m/s</span>
              </div>
              {hour.precipitation > 0 && (
                <div className="text-sm text-blue-600 mt-1">
                  💧 {hour.precipitation}%
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast; 