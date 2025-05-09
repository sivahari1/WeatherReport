import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WeatherData, getCurrentWeather } from '../services/weatherService';

interface WeatherCardProps {
  city: string;
  onTempUpdate?: (temp: number) => void;
  units: 'metric' | 'imperial';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, onTempUpdate, units }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      }));
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getCurrentWeather(city, units);
        setWeather(data);
        setError(null);
        if (onTempUpdate && data) {
          onTempUpdate(data.temp);
        }
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, units]);

  if (loading) {
    return (
      <motion.div
        className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200/50 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200/50 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200/50 rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-6 bg-gray-200/50 rounded"></div>
            <div className="h-6 bg-gray-200/50 rounded"></div>
            <div className="h-6 bg-gray-200/50 rounded"></div>
            <div className="h-6 bg-gray-200/50 rounded"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error || !weather) {
    return (
      <motion.div
        className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-red-500">{error || 'No weather data available'}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-gray-800">
            {weather.city}, {weather.country}
          </h2>
          <div className="flex items-center gap-2 text-gray-500">
            <p>{new Date().toLocaleDateString()}</p>
            <span>•</span>
            <p className="font-mono">{currentTime}</p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="text-6xl"
        >
          {weather.icon}
        </motion.div>
      </div>
      
      <div className="mt-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-light text-gray-800"
        >
          {weather.temp}°{units === 'metric' ? 'C' : 'F'}
        </motion.div>
        <p className="text-gray-600 mt-2 capitalize">{weather.description}</p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-500"
        >
          <div className="bg-white/20 rounded-lg p-3">
            <span className="font-medium">Feels like:</span> {weather.feels_like}°{units === 'metric' ? 'C' : 'F'}
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <span className="font-medium">Humidity:</span> {weather.humidity}%
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <span className="font-medium">Wind:</span> {Math.round(weather.wind_speed * 3.6)} {units === 'metric' ? 'km/h' : 'mph'}
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <span className="font-medium">Pressure:</span> {weather.pressure} hPa
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherCard; 