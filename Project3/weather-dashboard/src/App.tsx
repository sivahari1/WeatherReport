import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import HourlyForecast from './components/HourlyForecast';
import WeatherAlerts from './components/WeatherAlerts';
import SunTimes from './components/SunTimes';
import TemperatureToggle from './components/TemperatureToggle';
import WeatherMap from './components/WeatherMap';
import { motion } from 'framer-motion';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  const convertTemp = (temp: number) => {
    if (tempUnit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const handleSearch = async (searchCity: { name: string, lat: number, lon: number }) => {
    setLoading(true);
    setError('');
    try {
      const [weatherRes, forecastRes, hourlyRes, alertsRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?lat=${searchCity.lat}&lon=${searchCity.lon}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?lat=${searchCity.lat}&lon=${searchCity.lon}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?lat=${searchCity.lat}&lon=${searchCity.lon}&appid=${API_KEY}&units=metric&cnt=8`),
        fetch(`${BASE_URL}/onecall?lat=${searchCity.lat}&lon=${searchCity.lon}&appid=${API_KEY}&units=metric&exclude=minutely,daily`)
      ]);

      if (!weatherRes.ok || !forecastRes.ok || !hourlyRes.ok || !alertsRes.ok) {
        throw new Error('City not found');
      }

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();
      const hourlyData = await hourlyRes.json();
      const alertsData = await alertsRes.json();

      setCity(searchCity.name);
      setWeather(weatherData);
      setForecast(forecastData.list.filter((item: any, index: number) => index % 8 === 0).slice(0, 5));
      setHourlyData(hourlyData.list);
      setAlerts(alertsData.alerts || []);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
      setForecast([]);
      setHourlyData([]);
      setAlerts([]);
    }
    setLoading(false);
  };

  const toggleTempUnit = () => {
    setTempUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-white mb-8"
        >
          Weather Dashboard
        </motion.h1>
        
        <SearchBar onSearch={handleSearch} />
        <div className="flex justify-end mb-4">
          <TemperatureToggle unit={tempUnit} onToggle={toggleTempUnit} />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          >
            {error}
          </motion.div>
        )}

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {weather && (
          <>
            <WeatherCard 
              city={weather.name} 
              temperature={convertTemp(weather.main.temp)}
              description={weather.weather[0].description}
              icon={weather.weather[0].icon}
              humidity={weather.main.humidity}
              windSpeed={weather.wind.speed}
              feelsLike={convertTemp(weather.main.feels_like)}
            />
            
            <SunTimes 
              sunrise={new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              sunset={new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            />

            <WeatherMap city={weather.name} />

            {alerts.length > 0 && <WeatherAlerts alerts={alerts} />}
            
            <HourlyForecast hourlyData={hourlyData} />
            
            <Forecast forecast={forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App; 