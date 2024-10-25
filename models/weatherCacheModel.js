const mongoose = require('mongoose');

const weatherCacheSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lon: Number,
  },
  data: Object,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WeatherCache', weatherCacheSchema);
