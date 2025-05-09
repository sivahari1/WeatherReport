import React, { useState } from 'react';
import WeatherWidget from './WeatherWidget';

interface WeatherWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultCity = 'London';

const WeatherWidgetModal: React.FC<WeatherWidgetModalProps> = ({ isOpen, onClose }) => {
  const [city, setCity] = useState(defaultCity);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const widgetUrl = `${window.location.origin}/widget.html?city=${encodeURIComponent(city)}&units=${units}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`<iframe src=\"${widgetUrl}\" width=\"300\" height=\"250\" frameborder=\"0\" style=\"border:0;overflow:hidden;\"></iframe>`);
    alert('Embed code copied to clipboard!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
        <h2 className="text-xl font-semibold mb-4 text-center">Weather Widget Generator</h2>
        <div className="mb-4 flex gap-2 items-center">
          <label className="font-medium">City:</label>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
            placeholder="Enter city name"
          />
          <select value={units} onChange={e => setUnits(e.target.value as 'metric' | 'imperial')} className="border rounded px-2 py-1">
            <option value="metric">°C</option>
            <option value="imperial">°F</option>
          </select>
        </div>
        <div className="mb-4">
          <span className="block font-medium mb-2">Preview:</span>
          <WeatherWidget city={city} units={units} />
        </div>
        <div className="mb-2">
          <span className="block font-medium mb-1">Embed code:</span>
          <textarea
            className="w-full border rounded p-2 text-xs bg-gray-100"
            rows={2}
            readOnly
            value={`<iframe src=\"${widgetUrl}\" width=\"300\" height=\"250\" frameborder=\"0\" style=\"border:0;overflow:hidden;\"></iframe>`}
          />
        </div>
        <button
          onClick={handleCopy}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-2"
        >
          Copy Embed Code
        </button>
      </div>
    </div>
  );
};

export default WeatherWidgetModal; 