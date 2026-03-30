const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

const API_KEY = process.env.ACCUWEATHER_API_KEY;

app.use(require("cors")());

// Get 5-day forecast
app.get("/weather", async (req, res) => {
    const city = req.query.city;

    try {
        // Step 1: Get location key
        const locationRes = await axios.get(
            `http://dataservice.accuweather.com/locations/v1/cities/search`,
            {
                params: {
                    apikey: API_KEY,
                    q: city
                }
            }
        );

        const locationKey = locationRes.data[0].Key;

        // Step 2: Get 5-day forecast
        const weatherRes = await axios.get(
            `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`,
            {
                params: {
                    apikey: API_KEY,
                    metric: true
                }
            }
        );

        res.json(weatherRes.data.DailyForecasts);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch weather" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});