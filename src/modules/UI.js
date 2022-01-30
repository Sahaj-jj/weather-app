import Forecast from './Forecast';

const UI = (() => {
  const $cityInput = document.querySelector('input.city');
  const $searchBtn = document.querySelector('.search-city');

  const $temp = document.querySelector('.temperature');
  const $feelsLikeTemp = document.querySelector('.feels-like-temp');
  const $unitSelector = document.querySelector('.unit-selector');
  // const $weatherIcon = document.querySelector('.weather-icon');

  const body = document.querySelector('body');

  const getCityInput = () => {
    const cityName = $cityInput.value;
    $cityInput.value = '';
    return cityName;
  };

  const loading = (begin) => {
    if (begin) {
      body.style.pointerEvents = 'none';
    } else {
      body.style.pointerEvents = 'auto';
    }
  };

  const updateTemperatureDOM = () => {
    const forecast = Forecast.getForecast();
    $temp.textContent = `${Math.round(forecast.temp)}`;
    $feelsLikeTemp.textContent = `${Math.round(forecast.feelsLike)}°`;
    $unitSelector.textContent = `°${forecast.unit}`;
  };

  const updateDOM = () => {
    updateTemperatureDOM();
    // const forecast = Forecast.getForecast();
    // const weatherIcon = document.createElement('img');
    // weatherIcon.src = `http://openweathermap.org/img/w/${forecast.id}.png`;
    // $weatherIcon.appendChild(weatherIcon);
  };

  const populateWeather = async () => {
    const cityName = getCityInput();
    loading(true);
    // Wait for data being fetched
    const OK = await Forecast.loadContents(cityName);
    loading(false);
    if (!OK) {
      console.log('Location not found');
      return;
    }
    updateDOM();
  };

  const toggleUnit = () => {
    Forecast.toggleUnit();
    updateTemperatureDOM();
  };

  const init = () => {
    // Sample Value
    $cityInput.value = 'London';
    populateWeather();

    $searchBtn.addEventListener('click', populateWeather);
    $cityInput.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') populateWeather();
    });
    $unitSelector.addEventListener('click', toggleUnit);
  };

  return {
    init,
  };
})();

export default UI;
