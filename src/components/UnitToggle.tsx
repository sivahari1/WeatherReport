import React from 'react';
import { motion } from 'framer-motion';

interface UnitToggleProps {
  units: 'metric' | 'imperial';
  onToggle: (units: 'metric' | 'imperial') => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-1"
    >
      <button
        onClick={() => onToggle('metric')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          units === 'metric'
            ? 'bg-white text-gray-800 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle('imperial')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          units === 'imperial'
            ? 'bg-white text-gray-800 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        °F
      </button>
    </motion.div>
  );
};

export default UnitToggle; 