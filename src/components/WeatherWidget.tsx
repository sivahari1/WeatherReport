import React, { useEffect, useState } from 'react';
import { getCurrentWeather, WeatherData } from '../services/weatherService';

interface WeatherWidgetProps {
  city: string;
  units: 'metric' | 'imperial';
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, units }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getCurrentWeather(city, units);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city, units]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error || !weather) return <div className="text-center text-red-500">{error || 'No data'}</div>;

  return (
    <div className="bg-white/80 rounded-lg shadow p-3 w-64 mx-auto text-center text-gray-800">
      <div className="text-lg font-semibold mb-1">{weather.city}, {weather.country}</div>
      <div className="text-4xl mb-1">{weather.icon}</div>
      <div className="text-2xl font-bold mb-1">{weather.temp}°{units === 'metric' ? 'C' : 'F'}</div>
      <div className="capitalize text-sm mb-1">{weather.description}</div>
      <div className="flex justify-center gap-4 text-xs mt-2">
        <span>💧 {weather.humidity}%</span>
        <span>💨 {Math.round(weather.wind_speed * 3.6)} {units === 'metric' ? 'km/h' : 'mph'}</span>
      </div>
    </div>
  );
};

export default WeatherWidget; 