import { useEffect, useState } from "react";

function Icon(props) {
  // this state simplifies the use of data
  const [temporary, setTemporary] = useState("");

  useEffect(() => {
    if (props.data) {
      setTemporary(props.data);
    }
  }, [props.data]);

  return (
    <div className="Icon">
      <img src={temporary ? temporary.current.condition.icon : ""} />
    </div>
  );
}

export default Icon;
