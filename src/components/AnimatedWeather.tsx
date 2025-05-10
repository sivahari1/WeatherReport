import React from 'react';

interface AnimatedWeatherProps {
  type: 'clear' | 'clouds' | 'rain' | 'snow' | 'thunderstorm' | 'mist';
}

const AnimatedWeather: React.FC<AnimatedWeatherProps> = ({ type }) => {
  switch (type) {
    case 'clear':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="16" fill="#FFD93B">
            <animate attributeName="r" values="16;18;16" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'clouds':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="40" rx="18" ry="10" fill="#B0BEC5">
            <animate attributeName="cx" values="32;36;32" dur="2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="44" cy="44" rx="10" ry="6" fill="#90A4AE" />
        </svg>
      );
    case 'rain':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="40" rx="18" ry="10" fill="#B0BEC5" />
          <ellipse cx="44" cy="44" rx="10" ry="6" fill="#90A4AE" />
          <line x1="24" y1="54" x2="24" y2="64" stroke="#2196F3" strokeWidth="3">
            <animate attributeName="y1" values="54;64;54" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y2" values="64;74;64" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="32" y1="54" x2="32" y2="64" stroke="#2196F3" strokeWidth="3">
            <animate attributeName="y1" values="54;64;54" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="64;74;64" dur="1.2s" repeatCount="indefinite" />
          </line>
          <line x1="40" y1="54" x2="40" y2="64" stroke="#2196F3" strokeWidth="3">
            <animate attributeName="y1" values="54;64;54" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="y2" values="64;74;64" dur="1.4s" repeatCount="indefinite" />
          </line>
        </svg>
      );
    case 'snow':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="40" rx="18" ry="10" fill="#B0BEC5" />
          <ellipse cx="44" cy="44" rx="10" ry="6" fill="#90A4AE" />
          <text x="24" y="60" fontSize="24" fill="#90CAF9">*</text>
          <text x="36" y="60" fontSize="24" fill="#90CAF9">*</text>
        </svg>
      );
    case 'thunderstorm':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="40" rx="18" ry="10" fill="#B0BEC5" />
          <polygon points="30,50 36,50 32,60" fill="#FFD600">
            <animate attributeName="points" values="30,50 36,50 32,60;30,54 36,54 32,64;30,50 36,50 32,60" dur="1s" repeatCount="indefinite" />
          </polygon>
        </svg>
      );
    case 'mist':
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="40" rx="18" ry="10" fill="#B0BEC5" />
          <rect x="16" y="52" width="32" height="4" fill="#CFD8DC">
            <animate attributeName="x" values="16;20;16" dur="2s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    default:
      return null;
  }
};

export default AnimatedWeather; 