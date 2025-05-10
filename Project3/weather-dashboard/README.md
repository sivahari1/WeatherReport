# Weather Dashboard

A modern React weather dashboard app with city search, weather details, forecast, hourly data, weather alerts, and a weather map.

## Features
- City search with suggestions (OpenWeatherMap Geocoding API)
- Current weather details
- 5-day forecast
- Hourly forecast
- Weather alerts (if available)
- Temperature unit toggle (°C/°F)
- Weather map
- Clean, modern UI with Tailwind CSS

## Setup Instructions

1. **Clone or copy this folder to your machine.**
2. **Create a `.env` file in the root of the project (next to `package.json`):**
   ```
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
   REACT_APP_OPENWEATHER_API_KEY=your_openweathermap_api_key
   ```
   You can get a free API key from https://home.openweathermap.org/users/sign_up

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Start the development server:**
   ```sh
   npm start
   ```
   The app will open at http://localhost:3000

## Notes
- Always run `npm start` from inside this project folder.
- If you change the `.env` file, restart the server.
- For any issues, check the browser console and terminal for errors.

## Customization

### API Integration

To integrate with a real weather API (like OpenWeatherMap):

1. Sign up for an API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the root directory
3. Add your API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

### Styling

The app uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

## Built With

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

## License

This project is licensed under the MIT License. 