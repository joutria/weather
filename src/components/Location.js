function Location() {
  return (
    <div className="Location">
      <div className="location-flex">
        <div className="location-loader" role="img" aria-label="loader">⏳</div>
        <div className="location-title">Getting location
          {[0, 1, 2].map(i => (
            <span key={i} className="location-dot" style={{ animationDelay: `${i * 0.1}s` }}>.</span>
          ))}
        </div>
        <div className="location-info">
          We use your location <b>only</b> to determine the weather for your city.<br />
          You can continue without sharing your location by denying the request and typing the city of your preference.
        </div>
      </div>
    </div>
  );
}

export default Location;
