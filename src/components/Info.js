function Info({ data, toggler }) {
  if (!data) return null;
  const temp = toggler ? `${data.current.temp_c}\u00baC` : `${data.current.temp_f}\u00baF`;
  return (
    <div className="Info">
      <p className="temperature">{temp}</p>
      <p className='weather'>{data.current.condition.text}</p>
      <p className='city'>{data.location.name}, {data.location.country}</p>
    </div>
  );
}

export default Info;
