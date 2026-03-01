import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;
const ACCESS_KEY = process.env.WEATHERSTACK_ACCESS_KEY;

app.use(cors());
app.use(express.json());

app.get('/api/current', async (req: Request, res: Response) => {
    const city = req.query.query;

    if (!ACCESS_KEY) {
        return res.status(500).json({ error: 'Weatherstack API key is missing' });
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

        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
