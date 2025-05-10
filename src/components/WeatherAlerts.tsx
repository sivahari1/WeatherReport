import React from 'react';
import { motion } from 'framer-motion';
import { WeatherAlert } from '../services/weatherService';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'extreme':
        return 'bg-red-600';
      case 'severe':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'minor':
        return 'bg-yellow-400';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Weather Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg shadow-md ${getSeverityColor(alert.severity)} text-white`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">{alert.event}</h3>
              <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">
                {alert.severity}
              </span>
            </div>
            <p className="text-sm">{alert.description}</p>
            <div className="mt-2 text-sm opacity-80">
              {new Date(alert.start * 1000).toLocaleString()} - {new Date(alert.end * 1000).toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherAlerts; 