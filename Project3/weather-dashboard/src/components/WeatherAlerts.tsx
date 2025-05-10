import React from 'react';
import { motion } from 'framer-motion';

interface WeatherAlert {
  type: 'warning' | 'info' | 'danger';
  message: string;
  time: string;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'danger':
        return 'bg-red-100 border-red-400 text-red-800';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      {alerts.map((alert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`border-l-4 p-4 mb-2 rounded-r-lg ${getAlertColor(alert.type)}`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {alert.type === 'warning' && '⚠️'}
              {alert.type === 'danger' && '🚨'}
              {alert.type === 'info' && 'ℹ️'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs mt-1 opacity-75">{alert.time}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WeatherAlerts; 