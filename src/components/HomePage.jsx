import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      navigate(`/weather/${city.trim()}`);
    }
  };

  const presetCities = ["Catania", "Firenze", "Tokyo", "New York", "Mauritius"];

  return (
    <div className="home-center text-center">
      <div style={{ fontSize: "7rem", color: "#ffc107" }}>
        <i className="bi bi-brightness-high-fill"></i>
      </div>
      <h1 className="mb-4 text-center">Controlla il meteo</h1>
      <h2 className="mb-2 text-center">in modo da non perdere (il) tempo</h2>
      <form
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Inserisci il nome della città"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Cerca
        </button>
      </form>
      <div className="mt-5 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3 text-center"> Città popolari </h2>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {presetCities.map((cityName) => (
            <button
              key={cityName}
              className="btn btn-outline-secondary"
              style={{ margin: "2px" }}
              onClick={() => navigate(`/weather/${cityName}`)}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
