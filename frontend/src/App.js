import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData1, setWeatherData1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiUrl = "http://localhost:5000/weather";
      try {
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setError("Error fetching initial weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/weather/${city}`);
      setWeatherData1(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching city-specific weather:", err);
      setError("Failed to fetch weather data. Please check the city name.");
      setWeatherData1(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }


  const { location, current } = weatherData || {};
  const { name, country } = location || {};
  const {
    temperature,
    weather_descriptions,
    weather_icons,
    wind_speed,
    humidity,
    pressure,
    feelslike,
  } = current || {};

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Weather Information
        </h1>

        {weatherData && (
          <div className="bg-black shadow-lg rounded-lg p-6 mb-8 text-white">
            <h2 className="text-xl font-semibold mb-2">
              {name}, {country}
            </h2>
            <div className="flex items-center gap-4">
              {weather_icons && (
                <img
                  className="w-16 h-16"
                  src={weather_icons[0]}
                  alt={weather_descriptions?.[0]}
                />
              )}
              <div>
                <p className="text-white-700">Temperature: {temperature}°C</p>
                <p className="text-white-700">Feels Like: {feelslike}°C</p>
                <p className="text-white-700">Wind Speed: {wind_speed} km/h</p>
                <p className="text-white-700">Humidity: {humidity}%</p>
                <p className="text-white-700">Pressure: {pressure} hPa</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-black shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">
            Search City Weather
          </h2>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-lg p-2 flex-1"
            />
            <button
              onClick={fetchWeather}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
            >
              Get Weather
            </button>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          {weatherData1 && (
            <div className="bg-red-50 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-2">
                {weatherData1.location}
              </h2>
              <p className="text-gray-700">Temperature: {weatherData1.temperature}</p>
              <p className="text-gray-700">Feels Like: {weatherData1.feelsLike}</p>
              <p className="text-gray-700">Weather: {weatherData1.weather}</p>
              <p className="text-gray-700">Humidity: {weatherData1.humidity}</p>
              <p className="text-gray-700">Wind Speed: {weatherData1.wind}</p>
              <p className="text-gray-700">Visibility: {weatherData1.visibility}</p>
              <p className="text-gray-700">Sunrise: {weatherData1.sunrise}</p>
              <p className="text-gray-700">Sunset: {weatherData1.sunset}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
