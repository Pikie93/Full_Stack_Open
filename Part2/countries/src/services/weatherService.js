import axios from "axios";

const apiKey = import.meta.env.VITE_SOME_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherByCity = (city) => {
  return axios.get(baseUrl, {
    params: {
      q: city,
      appid: apiKey,
      units: "metric",
    },
  });
};

export default { getWeatherByCity };
