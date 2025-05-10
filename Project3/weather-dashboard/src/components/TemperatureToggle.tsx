import React from 'react';
import { motion } from 'framer-motion';

interface TemperatureToggleProps {
  unit: 'C' | 'F';
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-2"
    >
      <button
        onClick={onToggle}
        className="bg-white/20 hover:bg-white/30 text-gray-800 px-3 py-1 rounded-lg transition-colors duration-200"
      >
        °{unit}
      </button>
    </motion.div>
  );
};

export default TemperatureToggle; 