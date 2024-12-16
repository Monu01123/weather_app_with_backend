import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  if (!city) {
    res.status(400).json({ message: "city is required" });
  }

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=319af9de2b6d68f7e19665ba73bd301b`
    );
    const weatherData = response.data;

    const result = {
      location: `${weatherData.name}, ${weatherData.sys.country}`,
      temperature: `${weatherData.main.temp}°C`,
      feelsLike: `${weatherData.main.feels_like}°C`,
      weather: `${weatherData.weather[0].description}`,
      humidity: `${weatherData.main.humidity}%`,
      wind: `${weatherData.wind.speed} m/s`,
      visibility: `${weatherData.visibility / 1000} km`,
      sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
    };
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

router.get("/weather", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=0b1501703844c29589025594bd0293bf&query=fetch:ip`
    );

    console.log("Weather API Response:", response.data);

    if (response.status === 200) {
      res.status(200).json(response.data); 
    } else {
      res.status(404).json({ message: "Weather data not found" });
    }
  } catch (error) {
    console.error("Error fetching weather data:", {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null,
    });

    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});


export default router; 