import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  wind_speed: number;
  city: string;
  country: string;
}

export interface ForecastData {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

const getWeatherIcon = (iconCode: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
  };
  return iconMap[iconCode] || '☀️';
};

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    return {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: getWeatherIcon(data.weather[0].icon),
      wind_speed: data.wind.speed,
      city: data.name,
      country: data.sys.country,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (city: string): Promise<ForecastData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    // Get one forecast per day at noon
    const dailyForecasts = response.data.list.filter((item: any) => 
      item.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    return dailyForecasts.map((forecast: any) => ({
      date: new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(forecast.main.temp),
      description: forecast.weather[0].description,
      icon: getWeatherIcon(forecast.weather[0].icon),
    }));
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}; 