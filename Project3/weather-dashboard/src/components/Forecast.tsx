import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ForecastData, getForecast } from '../services/weatherService';

interface ForecastProps {
  city: string;
}

const Forecast: React.FC<ForecastProps> = ({ city }) => {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const data = await getForecast(city);
        setForecast(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch forecast data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-light text-gray-800 mb-4">5-Day Forecast</h3>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 bg-white/20 rounded-xl p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-200/50 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200/50 rounded w-full my-2"></div>
              <div className="h-4 bg-gray-200/50 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200/50 rounded w-3/4 mt-2"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error || forecast.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-6"
      >
        <p className="text-red-500">{error || 'No forecast data available'}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-6"
    >
      <h3 className="text-xl font-light text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="flex overflow-x-auto gap-4 pb-2">
        {forecast.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 w-24 bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm"
          >
            <p className="text-gray-600 font-medium">{day.date}</p>
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="text-3xl my-2"
            >
              {day.icon}
            </motion.div>
            <p className="text-gray-800 font-light">{day.temp}°C</p>
            <p className="text-sm text-gray-500 capitalize">{day.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast; 