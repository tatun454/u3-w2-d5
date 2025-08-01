import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "55b5cc618f839fd05f5fd4f33d71ff42";

export default function WeatherDetail() {
  const { city } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}&lang=it`;
        const currentRes = await fetch(currentUrl);
        if (!currentRes.ok) {
          throw new Error("City not found");
        }
        const currentData = await currentRes.json();
        setCurrentWeather(currentData);

        const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}&lang=it`;
        const forecastRes = await fetch(forecastUrl);
        if (!forecastRes.ok) {
          throw new Error("Forecast not found");
        }
        const forecastData = await forecastRes.json();

        const dailyForecast = forecastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForecast(dailyForecast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) return <div className="container mt-5">Caricamento...</div>;
  if (error)
    return (
      <div className="container mt-5">
        <p className="text-danger">Errore: {error}</p>
        <Link to="/" className="btn btn-secondary">
          Torna alla home
        </Link>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="weather-title">Meteo per {city}</div>
      <div className="weather-main">
        {currentWeather && (
          <div className="weather-current mb-4">
            <div className="icon mb-2">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                alt={currentWeather.weather[0].description}
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div className="temp">{Math.round(currentWeather.main.temp)}°C</div>
            <div className="mb-2">
              {currentWeather.weather[0].description.charAt(0).toUpperCase() +
                currentWeather.weather[0].description.slice(1)}
            </div>
            <div>
              <span>Umidità: {currentWeather.main.humidity}%</span>
              <br />
              <span>
                Vento: {Math.round(currentWeather.wind.speed * 3.6)} km/h
              </span>
            </div>
          </div>
        )}
        <div className="weather-forecast">
          <h2 className="mb-3" style={{ fontSize: "1.2rem" }}>
            Prossimi giorni
          </h2>
          <div className="forecast-list">
            {forecast.map((day) => (
              <div key={day.dt} className="forecast-day">
                <div>
                  {new Date(day.dt_txt).toLocaleDateString("it-IT", {
                    weekday: "short",
                  })}
                </div>
                <div className="icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                    style={{ width: "48px", height: "48px" }}
                  />
                </div>
                <div className="temp-max">{Math.round(day.main.temp_max)}°</div>
                <div className="temp-min">{Math.round(day.main.temp_min)}°</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="weather-bottom-bar">
        <Link
          to="/"
          className="btn btn-secondary text-white"
          style={{ maxWidth: "200px" }}
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
