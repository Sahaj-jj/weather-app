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
      // temp-info
      forecast.temp = weatherData.main.temp - 273.15;
      forecast.feelsLike = weatherData.main.feels_like - 273.15;
      forecast.humidity = weatherData.main.humidity;
      forecast.icon = weatherData.weather[0].icon;
      // location-info
      forecast.main = weatherData.weather[0].main;
      forecast.country = weatherData.sys.country;
      forecast.time = new Date().toLocaleTimeString();
      // extra-info
      forecast.tempMax = weatherData.main.temp_max - 273.15;
      forecast.tempMin = weatherData.main.temp_min - 273.15;
      forecast.humidity = weatherData.main.humidity;
      forecast.windSpeed = weatherData.wind.speed;
      return true;
    } catch (err) {
      return false;
    }
  };

  const toggleUnit = () => {
    forecast.temp = changeUnit(forecast.temp, forecast.unit);
    forecast.feelsLike = changeUnit(forecast.feelsLike, forecast.unit);
    forecast.tempMax = changeUnit(forecast.tempMax, forecast.unit);
    forecast.tempMin = changeUnit(forecast.tempMin, forecast.unit);
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
