function Icon({ data }) {
  return (
    <div className="Icon">
      <img src={data ? data.current.condition.icon : ""} alt="weather icon" />
    </div>
  );
}

export default Icon;
