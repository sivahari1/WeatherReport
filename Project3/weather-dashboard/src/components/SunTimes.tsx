import React from 'react';
import { motion } from 'framer-motion';

interface SunTimesProps {
  sunrise: string;
  sunset: string;
}

const SunTimes: React.FC<SunTimesProps> = ({ sunrise, sunset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/20 rounded-xl p-4 mt-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌅</span>
          <div>
            <p className="text-sm text-gray-600">Sunrise</p>
            <p className="text-lg font-medium text-gray-800">{sunrise}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌇</span>
          <div>
            <p className="text-sm text-gray-600">Sunset</p>
            <p className="text-lg font-medium text-gray-800">{sunset}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SunTimes; 