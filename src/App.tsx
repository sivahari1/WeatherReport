import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import WeatherAlerts from './components/WeatherAlerts';
import HourlyForecast from './components/HourlyForecast';
import UnitToggle from './components/UnitToggle';
import { getCurrentWeather, getForecast, getHourlyForecast, getLocationWeather, WeatherData } from './services/weatherService';
import WeatherTrivia from './components/WeatherTrivia';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LanguageSelector from './components/LanguageSelector';

function getBgGradientByTemp(temp: number, units: 'metric' | 'imperial') {
  if (units === 'metric') {
    if (temp <= 0) {
      return 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600'; // Very cold
    } else if (temp <= 10) {
      return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400'; // Cold
    } else if (temp <= 20) {
      return 'bg-gradient-to-br from-green-200 via-yellow-200 to-yellow-300'; // Mild
    } else if (temp <= 30) {
      return 'bg-gradient-to-br from-yellow-200 via-orange-200 to-orange-300'; // Warm
    } else if (temp <= 35) {
      return 'bg-gradient-to-br from-orange-300 via-orange-400 to-red-400'; // Hot
    } else if (temp <= 40) {
      return 'bg-gradient-to-br from-red-400 via-red-500 to-red-600'; // Very Hot
    } else {
      return 'bg-gradient-to-br from-red-600 via-red-700 to-red-900'; // Extreme
    }
  } else {
    // Fahrenheit
    if (temp <= 32) {
      return 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600'; // Very cold
    } else if (temp <= 50) {
      return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400'; // Cold
    } else if (temp <= 68) {
      return 'bg-gradient-to-br from-green-200 via-yellow-200 to-yellow-300'; // Mild
    } else if (temp <= 86) {
      return 'bg-gradient-to-br from-yellow-200 via-orange-200 to-orange-300'; // Warm
    } else if (temp <= 95) {
      return 'bg-gradient-to-br from-orange-300 via-orange-400 to-red-400'; // Hot
    } else if (temp <= 104) {
      return 'bg-gradient-to-br from-red-400 via-red-500 to-red-600'; // Very Hot
    } else {
      return 'bg-gradient-to-br from-red-600 via-red-700 to-red-900'; // Extreme
    }
  }
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('Hyderabad');
  const [currentTemp, setCurrentTemp] = useState<number>(20);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, language, setLanguage } = useLanguage();

  const fetchWeatherData = async (location: string | { lat: number; lon: number }) => {
    setLoading(true);
    setError(null);
    try {
      let weather;
      if (typeof location === 'string') {
        weather = await getCurrentWeather(location, units);
      } else {
        weather = await getLocationWeather(location.lat, location.lon, units);
      }
      setWeatherData(weather);
      setCurrentTemp(weather.temp);
      setCity(weather.city);

      const hourly = await getHourlyForecast(weather.city, units);
      setHourlyForecast(hourly);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [units]);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
    fetchWeatherData(newCity);
  };

  const handleTempUpdate = (temp: number) => {
    setCurrentTemp(temp);
  };

  const handleUnitToggle = (newUnits: 'metric' | 'imperial') => {
    setUnits(newUnits);
  };

  const handleLocationClick = () => {
    // Allow geolocation on HTTPS or localhost/127.0.0.1
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (window.location.protocol !== 'https:' && !isLocalhost) {
      setError('Geolocation requires a secure HTTPS connection. Please use HTTPS to access your location.');
      return;
    }

    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          let errorMessage = 'Failed to get your location. ';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Please allow location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'Please try searching for a city instead.';
          }
          setError(errorMessage);
          setLoading(false);
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please try searching for a city instead.');
    }
  };

  return (
    <div className={`min-h-screen ${getBgGradientByTemp(currentTemp, units)} p-4 md:p-8 transition-colors duration-700`}>
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
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <h1 className="text-4xl font-light text-gray-800 text-center md:text-left">
            {t('currentWeather')}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
            <UnitToggle units={units} onToggle={handleUnitToggle} />
            <button
              onClick={handleLocationClick}
              className="p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 transition-colors"
              title="Use my location"
            >
              📍
            </button>
          </div>
        </motion.div>

        <WeatherTrivia />

        <SearchBar onSearch={handleSearch} />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : (
          <>
            {weatherData?.alerts && weatherData.alerts.length > 0 && (
              <WeatherAlerts alerts={weatherData.alerts} />
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <WeatherCard city={city} onTempUpdate={handleTempUpdate} units={units} />
            </motion.div>

            {hourlyForecast.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <HourlyForecast forecast={hourlyForecast} units={units} />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Forecast city={city} units={units} />
            </motion.div>
          </>
        )}

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

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <WeatherApp />
    </LanguageProvider>
  );
};

export default App; 