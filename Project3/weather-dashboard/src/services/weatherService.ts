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

export interface HourlyForecastData {
  time: string;
  temp: number;
  icon: string;
  description: string;
  windSpeed: number;
  precipitation: number;
}

export interface WeatherAlert {
  type: 'warning' | 'info' | 'danger';
  message: string;
  time: string;
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

export const getHourlyForecast = async (city: string): Promise<HourlyForecastData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    
    return data.list.slice(0, 8).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
      }),
      temp: Math.round(item.main.temp),
      icon: getWeatherIcon(item.weather[0].id),
      description: item.weather[0].description,
      windSpeed: item.wind.speed,
      precipitation: item.pop ? Math.round(item.pop * 100) : 0
    }));
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
};

export const getWeatherAlerts = async (city: string): Promise<WeatherAlert[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    
    const alerts: WeatherAlert[] = [];
    
    // Check for extreme temperatures
    if (data.main.temp > 35) {
      alerts.push({
        type: 'warning',
        message: 'High temperature alert: Stay hydrated and avoid prolonged sun exposure',
        time: new Date().toLocaleTimeString()
      });
    } else if (data.main.temp < 5) {
      alerts.push({
        type: 'warning',
        message: 'Low temperature alert: Dress warmly and be cautious of frost',
        time: new Date().toLocaleTimeString()
      });
    }
    
    // Check for strong winds
    if (data.wind.speed > 10) {
      alerts.push({
        type: 'warning',
        message: 'Strong wind alert: Secure loose objects and be cautious outdoors',
        time: new Date().toLocaleTimeString()
      });
    }
    
    // Check for heavy rain
    if (data.weather[0].main === 'Rain' && data.rain && data.rain['1h'] > 5) {
      alerts.push({
        type: 'danger',
        message: 'Heavy rain alert: Risk of flooding in some areas',
        time: new Date().toLocaleTimeString()
      });
    }
    
    return alerts;
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    throw error;
  }
}; 