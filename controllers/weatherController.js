const axios = require('axios');
const WeatherCache = require('../models/weatherCacheModel');

const getWeatherData = async (req, res) => {

  const { lat, lon } = req.query;

  const apiKey = process.env.WEATHER_API_KEY;
  const baseUrl = process.env.WEATHER_API_URL;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    // Check for cached data
    const cachedWeather = await WeatherCache.findOne({
      'location.lat': lat,
      'location.lon': lon,
    });

    if (cachedWeather && (Date.now() - new Date(cachedWeather.timestamp)) < 10 * 60 * 1000) {
      return res.json(cachedWeather.data);
    }

    // Fetch new data from the weather API
    const response = await axios.get(`${baseUrl}/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
      },
    });

    // Update cache with new data
    await WeatherCache.findOneAndUpdate(
      { 'location.lat': lat, 'location.lon': lon },
      { data: response.data, timestamp: new Date() },
      { upsert: true }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeatherData };
