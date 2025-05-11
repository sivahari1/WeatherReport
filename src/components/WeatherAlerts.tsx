import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface WeatherAlert {
  event: string;
  description: string;
  start: number;
  end: number;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  const { t } = useLanguage();

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('weatherAlerts')}</h3>
        <p className="text-gray-600">{t('noAlerts')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('weatherAlerts')}</h3>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="bg-red-50 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">{alert.event}</h4>
            <p className="text-red-700 text-sm">{alert.description}</p>
            <div className="mt-2 text-xs text-red-600">
              <p>
                From: {new Date(alert.start * 1000).toLocaleString()}
              </p>
              <p>
                To: {new Date(alert.end * 1000).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts; 