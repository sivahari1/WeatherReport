import React from 'react';
import { motion } from 'framer-motion';

interface WeatherMapProps {
  city: string;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ city }) => {
  const mapUrl = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${city}&lon=${city}&zoom=10`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/20 rounded-xl p-4 mt-4 overflow-hidden"
    >
      <h3 className="text-lg font-semibold mb-2">Weather Map</h3>
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <iframe
          src={mapUrl}
          className="absolute top-0 left-0 w-full h-full border-0"
          title="Weather Map"
        />
      </div>
    </motion.div>
  );
};

export default WeatherMap; 