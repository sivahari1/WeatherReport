import React from 'react';

const facts = [
  "The highest temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley, California.",
  "The coldest temperature ever recorded was -89.2°C (-128.6°F) at Vostok Station, Antarctica.",
  "Raindrops can fall at speeds of about 22 miles per hour (35 km/h).",
  "Lightning strikes the Earth about 8.6 million times per day.",
  "A cubic mile of ordinary fog contains less than a gallon of water.",
  "The fastest wind speed ever recorded was 253 mph (407 km/h) during Tropical Cyclone Olivia in 1996.",
  "Snowflakes can take up to an hour to fall from the cloud to the ground.",
  "The wettest place on Earth is Mawsynram, India, with an average annual rainfall of 11,871 mm (467.4 in).",
  "The driest place on Earth is the Atacama Desert in Chile, where some weather stations have never recorded rain.",
  "Hailstones can be as large as grapefruits! The largest recorded hailstone in the US was 8 inches in diameter."
];

interface WeatherFunFactsProps {
  isOpen: boolean;
  onClose: () => void;
}

const WeatherFunFacts: React.FC<WeatherFunFactsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[80vh] flex flex-col">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
        <h2 className="text-xl font-semibold mb-4 text-center">🌈 Fun Weather Facts</h2>
        <ul className="overflow-y-auto flex-1 space-y-3 pr-2">
          {facts.map((fact, idx) => (
            <li key={idx} className="bg-blue-50 rounded p-2 text-gray-700 shadow-sm">{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherFunFacts; 