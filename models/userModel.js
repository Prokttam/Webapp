const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  preferredLocations: [
    {
      name: String, // E.g., 'Home'
      lat: Number,
      lon: Number,
    },
  ],
  notificationPreferences: {
    rain: { type: Boolean, default: false },
    snow: { type: Boolean, default: false },
    extremeTemperature: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('User', userSchema);
