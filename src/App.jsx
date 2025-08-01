import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import WeatherDetail from "./components/WeatherDetail.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:city" element={<WeatherDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
