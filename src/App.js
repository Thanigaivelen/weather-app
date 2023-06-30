import { useState } from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

function App() {
  const [query, setquery] = useState("");
  const [weather, setweather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      setweather(data);
      setquery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Enter City Name Here..."
        value={query}
        onChange={(e) => setquery(e.target.value)}
        onKeyPress={search}
      />

      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup className="sup">{weather.sys.country}</sup>
          </h2>

          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
