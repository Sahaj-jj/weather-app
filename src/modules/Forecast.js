import Weather from './Weather';

const changeUnit = (num, currentUnit) => {
  if (currentUnit === 'C') return num * (9 / 5) + 32;
  return (num - 32) * (5 / 9);
};

const Forecast = (() => {
  const forecast = {};

  const loadContents = async (cityName) => {
    forecast.unit = 'C';
    forecast.city = cityName;
    try {
      const weatherData = await Weather.getData(cityName);
      forecast.temp = weatherData.main.temp - 273.15;
      forecast.feelsLike = weatherData.main.feels_like - 273.15;
      forecast.humidity = weatherData.main.humidity;
      forecast.id = weatherData.main.id;
      forecast.main = weatherData.weather[0].main;
      return true;
    } catch (err) {
      return false;
    }
  };

  const toggleUnit = () => {
    forecast.temp = changeUnit(forecast.temp, forecast.unit);
    forecast.feelsLike = changeUnit(forecast.feelsLike, forecast.unit);
    forecast.unit = forecast.unit === 'C' ? 'F' : 'C';
    return forecast.unit;
  };

  const getForecast = () => forecast;

  return {
    getForecast,
    loadContents,
    toggleUnit,
  };
})();

export default Forecast;
