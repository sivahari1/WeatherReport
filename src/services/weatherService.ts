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
  wind_direction: number;
  city: string;
  country: string;
  alerts?: WeatherAlert[];
  sunrise: number;
  sunset: number;
}

export interface WeatherAlert {
  event: string;
  description: string;
  start: number;
  end: number;
  severity: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  description: string;
  icon: string;
  wind_speed: number;
  wind_direction: number;
  humidity: number;
  precipitation: number;
}

export interface ForecastData {
  date: string;
  temp: number;
  description: string;
  icon: string;
  wind_speed: number;
  wind_direction: number;
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

export const getCurrentWeather = async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units,
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
      wind_direction: data.wind.deg,
      city: data.name,
      country: data.sys.country,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      alerts: data.alerts || [],
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getHourlyForecast = async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units,
      },
    });

    return response.data.list.slice(0, 24).map((forecast: any) => ({
      dt: forecast.dt,
      temp: forecast.main.temp,
      weather: [
        {
          icon: forecast.weather[0].icon,
          description: forecast.weather[0].description,
        }
      ]
    }));
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
};

export const getForecast = async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units,
      },
    });

    const dailyForecasts = response.data.list.filter((item: any) => 
      item.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    return dailyForecasts.map((forecast: any) => ({
      date: new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(forecast.main.temp),
      description: forecast.weather[0].description,
      icon: getWeatherIcon(forecast.weather[0].icon),
      wind_speed: forecast.wind.speed,
      wind_direction: forecast.wind.deg,
    }));
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const getLocationWeather = async (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: units,
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
      wind_direction: data.wind.deg,
      city: data.name,
      country: data.sys.country,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      alerts: data.alerts || [],
    };
  } catch (error) {
    console.error('Error fetching location weather data:', error);
    throw error;
  }
}; 