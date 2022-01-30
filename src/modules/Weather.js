const Weather = (() => {
  const key = '0b94a86a7ab72879839de5a724686c9f';

  const getUrl = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    return url;
  };

  const getData = async (cityName) => {
    const response = await fetch(getUrl(cityName), { mode: 'cors' });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  };

  return {
    getData,
  };
})();

export default Weather;
