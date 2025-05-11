import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const GEO_API = 'https://api.openweathermap.org/geo/1.0/direct';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

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
    inputRef.current?.blur();
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
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={location}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={t('search') as string}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t('search') as string}
        </button>
      </form>

      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          {suggestions.map((city) => (
            <button
              key={`${city.name}-${city.country}`}
              onClick={() => handleSelect(city)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              {city.name}, {city.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 