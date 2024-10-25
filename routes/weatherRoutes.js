const express = require('express');
const { getWeatherData } = require('../controllers/weatherController');

const router = express.Router();

// Route to get weather by location (latitude & longitude)
router.post('/', getWeatherData);

module.exports = router;
