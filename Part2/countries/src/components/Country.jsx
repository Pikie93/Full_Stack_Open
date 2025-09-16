const Country = ({ countryObject, weather }) => {
  if (!countryObject) return null;

  const capital = countryObject.capital[0];

  return (
    <div>
      <h2>{countryObject.name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {countryObject.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(countryObject.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={countryObject.flags.png}
        alt={countryObject.flags.alt || `Flag of ${countryObject.name.common}`}
        width="200"
      />

      <h2>Weather in {capital}</h2>

      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Country;
