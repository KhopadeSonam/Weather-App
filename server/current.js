const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
    // Extract city from query
    const city = req.query.query;
    const ACCESS_KEY = process.env.WEATHERSTACK_ACCESS_KEY;

    if (!ACCESS_KEY) {
        return res.status(500).json({
            error: 'Weatherstack API key is missing. Please set WEATHERSTACK_ACCESS_KEY in Vercel environment variables.'
        });
    }

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: ACCESS_KEY,
                query: city
            }
        });

        if (response.data.error) {
            return res.status(400).json({ error: response.data.error.info });
        }

        // Return the weather data
        res.json(response.data);
    } catch (error) {
        console.error('Weather Data Error:', error);
        res.status(500).json({ error: 'Failed to fetch weather data from remote server' });
    }
};
