import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';

function getBgGradientByTemp(temp: number) {
  if (temp <= 20) {
    return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400'; // Cool
  } else if (temp <= 30) {
    return 'bg-gradient-to-br from-green-200 via-yellow-200 to-yellow-300'; // Mild
  } else if (temp <= 35) {
    return 'bg-gradient-to-br from-yellow-200 via-orange-200 to-orange-300'; // Warm
  } else if (temp <= 40) {
    return 'bg-gradient-to-br from-orange-300 via-orange-400 to-red-400'; // Hot
  } else if (temp <= 45) {
    return 'bg-gradient-to-br from-red-400 via-red-500 to-red-600'; // Very Hot
  } else {
    return 'bg-gradient-to-br from-red-600 via-red-700 to-red-900'; // Extreme
  }
}

const App: React.FC = () => {
  const [city, setCity] = useState('London');
  const [currentTemp, setCurrentTemp] = useState<number>(20);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  const handleTempUpdate = (temp: number) => {
    setCurrentTemp(temp);
  };

  return (
    <div className={`min-h-screen ${getBgGradientByTemp(currentTemp)} p-4 md:p-8 transition-colors duration-700`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-light text-gray-800 mb-8 text-center">
            Weather Dashboard
          </h1>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <WeatherCard city={city} onTempUpdate={handleTempUpdate} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Forecast city={city} />
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          <span className="text-red-500">❤️</span> <span className="font-semibold text-gray-700">Jsrk-Apps</span> <span className="text-red-500">❤️</span>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default App; 