import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface SearchBarProps {
  onSearch?: (location: string) => void;
}

const GEO_API = 'https://api.openweathermap.org/geo/1.0/direct';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 2) {
      try {
        const res = await axios.get(GEO_API, {
          params: {
            q: value,
            limit: 5,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
          },
        });
        setSuggestions(res.data);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city: any) => {
    const label = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
    setLocation(label);
    setSuggestions([]);
    if (onSearch) onSearch(city.name);
    inputRef.current?.blur(); // Remove focus to hide dropdown
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim() && onSearch) {
      onSearch(location.trim());
    }
    setSuggestions([]);
    inputRef.current?.blur();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      onSubmit={handleSubmit}
      className="relative mb-6"
      autoComplete="off"
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={location}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          placeholder="Search location..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 text-lg transition-shadow"
          spellCheck={false}
          autoComplete="off"
        />
        {isFocused && suggestions.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-white rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto border border-blue-100">
            {suggestions.map((city, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
                onMouseDown={() => handleSelect(city)}
              >
                {city.name}
                {city.state ? `, ${city.state}` : ''}, {city.country}
              </li>
            ))}
          </ul>
        )}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.button>
      </div>
    </motion.form>
  );
};

export default SearchBar; 