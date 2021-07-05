import { useEffect, useState } from "react";

function Info(props) {
  // this state simplifies the use of data
  const [temporary, setTemporary] = useState("");
  // this state stores the temperature
  const [temp, setTemp] = useState("");

  // every time the toggler changes, so do the temperature units
  useEffect(() => {
    if (temporary) {
      setTemp(`${temporary.current.temp_c}ºC`);
    }
    if (props.toggler && temporary) {
      setTemp(`${temporary.current.temp_c}ºC`);
    } else if (temporary) {
      setTemp(`${temporary.current.temp_f}ºF`);
    }
  }, [props.toggler, temporary]);

  //keeps the state up to date
  useEffect(() => {
    if (props.data) {
      setTemporary(props.data);
    }
  }, [props.data]);

  return (
    <div className="Info">
      <p className="temperature">{temporary ? temp : ""}</p>
      <p className='weather'>{temporary ? temporary.current.condition.text : ""}</p>
      <p className='city'>{temporary ? temporary.location.name : ""}, {temporary ? temporary.location.country : ""}</p>
    </div>
  );
}

export default Info;
