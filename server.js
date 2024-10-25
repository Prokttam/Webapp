const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weatherRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
// app.use(cors({
//     origin: 'http://localhost:3001', // Adjust the port if your frontend runs on a different port
// }));
app.use(express.json());

// Define routes
app.use('/api/weather', weatherRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
