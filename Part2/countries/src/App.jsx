import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import DisplayCountries from "./components/DisplayCountries";
import countriesService from "./services/countriesService";
import weatherService from "./services/weatherService";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchValue, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setCountries(null);
      setSelectedCountry(null);
      setWeather(null);
      return;
    }

    countriesService
      .getAll()
      .then((response) => {
        const allCountries = response.data;
        const filtered = allCountries.filter((c) =>
          c.name.common.toLowerCase().includes(searchValue.toLowerCase())
        );
        setCountries(filtered);
        setSelectedCountry(null);
        setWeather(null);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setCountries([]);
      });
  }, [searchValue]);

  useEffect(() => {
    const countryToShow =
      selectedCountry ||
      (countries && countries.length === 1 ? countries[0] : null);

    if (!countryToShow?.capital?.[0]) {
      setWeather(null);
      return;
    }

    const capital = countryToShow.capital[0];
    weatherService
      .getWeatherByCity(capital)
      .then((res) => setWeather(res.data))
      .catch((err) => {
        console.error("Weather fetch error:", err);
        setWeather(null);
      });
  }, [selectedCountry, countries]);

  const countryToDisplay =
    selectedCountry ||
    (countries && countries.length === 1 ? countries[0] : null);

  return (
    <div>
      <SearchFilter searchValue={searchValue} setSearch={setSearch} />

      {countryToDisplay ? (
        <Country countryObject={countryToDisplay} weather={weather} />
      ) : (
        <DisplayCountries
          countries={countries}
          onShowCountry={setSelectedCountry}
        />
      )}
    </div>
  );
};

export default App;
