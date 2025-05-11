import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HourlyForecastProps {
  forecast: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      icon: string;
      description: string;
    }>;
  }>;
  units: 'metric' | 'imperial';
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast, units }) => {
  const { t } = useLanguage();
  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-white/80 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('hourlyForecast')}</h3>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {forecast.map((hour, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[80px] p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-600">
                {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <img
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
                className="w-12 h-12"
              />
              <span className="text-lg font-semibold text-gray-900">
                {Math.round(hour.temp)}{tempUnit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast; 