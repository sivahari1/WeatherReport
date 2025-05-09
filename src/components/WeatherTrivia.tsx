import React, { useState } from 'react';

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

function getRandomFact(excludeIndex: number | null) {
  let idx = Math.floor(Math.random() * facts.length);
  while (excludeIndex !== null && idx === excludeIndex) {
    idx = Math.floor(Math.random() * facts.length);
  }
  return { fact: facts[idx], idx };
}

const WeatherTrivia: React.FC = () => {
  const [current, setCurrent] = useState(() => getRandomFact(null));

  const handleNextFact = () => {
    setCurrent(getRandomFact(current.idx));
  };

  return (
    <div className="bg-white/40 rounded-lg p-4 mb-4 shadow text-gray-700 flex flex-col items-center">
      <span className="font-semibold text-lg mb-2">🌦️ Weather Trivia</span>
      <p className="text-center mb-2">{current.fact}</p>
      <button
        onClick={handleNextFact}
        className="mt-2 px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded text-sm text-blue-800 transition-colors"
      >
        Show another fact
      </button>
    </div>
  );
};

export default WeatherTrivia; 