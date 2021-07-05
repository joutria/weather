import { useState, useEffect } from "react";
import "./App.css";
import Icon from "./components/Icon";
import Info from "./components/Info";
import SearchBar from "./components/SearchBar";
import Location from "./components/Location";

function App() {
  // state for the input field
  const [value, setValue] = useState("");
  //state that will store the data
  const [data, setData] = useState("");
  // state for the APIkey
  const [APIkey] = useState("c980394f68784e91915160418210307");
  //state for the url thet will be fetched
  const [url, setUrl] = useState(
    `https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${value}&aqi=no`
  );
  //toggler for the temperature ºC <=> ºF
  const [toggler, setToggler] = useState(true);

  // this will ask permission to acces the location of the user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  //if the user grants access to the location then it will execute this function
  function success(pos) {
    var crd = pos.coords;
    const myurl = `https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${crd.latitude},${crd.longitude}&aqi=no`;
    fetch(myurl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        document.querySelector(".Location").classList.add("hidden");
        document.querySelector(".container").classList.remove("hidden");
        document.querySelector("#cf").classList.remove("hidden");
      });
  }

  //if the user doesn't grant access to the location then it will execute this function
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    document.querySelector(".Location").classList.add("hidden");
  }

  // this will change the first letter to uppercase so the url can be fetched
  useEffect(() => {
    const str = value;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);

    setUrl(
      `https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${str2}&aqi=no`
    );
  }, [value]);

  return (
    <div className="App">
      <SearchBar
        setData={setData}
        value={value}
        setValue={setValue}
        url={url}
      />
      <div className="container hidden">
        <Icon data={data} />
        <Info data={data} toggler={toggler} />
      </div>
      <button
        id="cf"
        className="hidden"
        onClick={() => {
          setToggler(!toggler);
        }}
      >
        ºC / ºF
      </button>
      <Location />
    </div>
  );
}

export default App;
