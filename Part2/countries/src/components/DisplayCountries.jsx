const DisplayCountries = ({ countries, onShowCountry }) => {
  if (countries === null) return <p>Type something to search.</p>;

  if (countries.length === 0) return <p>No matches found.</p>;

  if (countries.length > 10)
    return <p>Too many matches, please filter more.</p>;

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShowCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default DisplayCountries;
