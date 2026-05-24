import { useState, useEffect } from "react";
import { getWeatherLinearGradient } from "./getWeatherColor";
import "./App.css";
import Icon from "./components/Icon";
import Info from "./components/Info";
import SearchBar from "./components/SearchBar";
import Location from "./components/Location";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [toggler, setToggler] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [lastCoords, setLastCoords] = useState(null);
  const [locationPending, setLocationPending] = useState(true);

  useEffect(() => {
    setLocationPending(true);
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  function success(pos) {
    setLocationPending(false);
    const crd = pos.coords;
    setLastCoords({ lat: crd.latitude, lon: crd.longitude });
    setLocationAllowed(true);
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${crd.latitude},${crd.longitude}&aqi=no`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setShowWeather(true);
      });
  }

  function error(err) {
    setLocationPending(false);
    console.warn(`ERROR(${err.code}): ${err.message}`);
    setLocationAllowed(false);
  }

  const getUrl = () => {
    const sanitized = encodeURIComponent(value.trim());
    return `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${sanitized}&aqi=no`;
  };

  const handleSearch = () => {
    if (!value.trim()) return;
    fetch(getUrl())
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Oops, it seems that we don't have information about that city");
        } else {
          setData(data);
          setShowWeather(true);
        }
      });
  };

  const handleLocationWeather = () => {
    if (!lastCoords) return;
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lastCoords.lat},${lastCoords.lon}&aqi=no`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setShowWeather(true);
      });
  };

  let bg = undefined;
  if (showWeather && data && data.current && data.current.condition && data.current.condition.code) {
    bg = getWeatherLinearGradient(data.current.condition.code, data.current.is_day, darkMode);
  }

  return (
    <div
      className={`App${darkMode ? ' dark' : ''}`}
      style={bg ? { background: bg, minHeight: '100vh', minWidth: '100vw', transition: 'background 0.5s' } : {}}
    >
      <div className="mode-toggle-container">
        <span className="sun-moon-emoji" style={{fontSize: '1.7rem'}}>{darkMode ? '🌙' : '☀️'}</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
          />
          <span className="slider"></span>
        </label>
      </div>
      <SearchBar
        setData={setData}
        value={value}
        setValue={setValue}
        onSearch={handleSearch}
      />
      {showWeather && (
        <>
          <div className="container">
            <Icon data={data} />
            <Info data={data} toggler={toggler} />
          </div>
          <div>
            <button
              id="cf"
              onClick={() => setToggler((t) => !t)}
              className="button"
            >
              ºC / ºF
            </button>
            {locationAllowed && lastCoords && (
              <button
                className="button location-btn"
                onClick={handleLocationWeather}
              >
                <span role="img" aria-label="location">📍</span> My Location
              </button>
            )}
          </div>
        </>
      )}
      {locationPending && <Location />}
    </div>
  );
}

export default App;
