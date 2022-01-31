import Forecast from './Forecast';

const UI = (() => {
  const $cityInput = document.querySelector('input.city');
  const $searchBtn = document.querySelector('.search-city');
  const $errorMsg = document.querySelector('.error-msg');
  const $main = document.querySelector('.main');
  const body = document.querySelector('body');
  // temp-info
  const $temp = document.querySelector('.temperature');
  const $feelsLikeTemp = document.querySelector('.feels-like-temp');
  const $unitSelector = document.querySelector('.unit-selector');
  const $weatherIcon = document.querySelector('.weather-icon');
  // location-info
  const $weatherMain = document.querySelector('.weather-main');
  const $city = document.querySelector('.location-info > .city');
  const $country = document.querySelector('.country');
  const $time = document.querySelector('.time');
  // extra-info
  const $tempMax = document.querySelector('.temp-max > .content');
  const $tempMin = document.querySelector('.temp-min > .content');
  const $humidity = document.querySelector('.humidity > .content');
  const $windSpeed = document.querySelector('.wind > .content');

  const getCityInput = () => {
    let cityName = $cityInput.value.toLowerCase();
    if (cityName) {
      cityName = cityName[0].toUpperCase() + cityName.slice(1);
      $cityInput.value = '';
    }
    return cityName;
  };

  const loading = (begin) => {
    if (begin) {
      body.style.pointerEvents = 'none';
      $main.classList.remove('loaded');
    } else {
      $main.classList.add('loaded');
      body.style.pointerEvents = 'auto';
    }
  };

  const showError = (msg) => {
    $cityInput.classList.add('error');
    $errorMsg.textContent = `* ${msg}`;
  };

  const updateTemperatureDOM = () => {
    const forecast = Forecast.getForecast();
    $temp.textContent = `${Math.round(forecast.temp)}`;
    $feelsLikeTemp.textContent = `${Math.round(forecast.feelsLike)}°`;
    $unitSelector.textContent = `°${forecast.unit}`;
    $tempMax.textContent = `${Math.round(forecast.tempMax)}°`;
    $tempMin.textContent = `${Math.round(forecast.tempMin)}°`;
  };

  const updateWeatherIcon = (forecast) => {
    const weatherIcon = document.createElement('img');
    weatherIcon.src = `http://openweathermap.org/img/wn/${forecast.icon}@4x.png`;
    if ($weatherIcon.childElementCount) $weatherIcon.lastChild.remove();
    $weatherIcon.appendChild(weatherIcon);
  };

  const updateLocationDOM = (forecast) => {
    $weatherMain.textContent = forecast.main;
    $city.textContent = `${forecast.city} ${forecast.country}`;
    $country.textContent = forecast.country;
    $time.textContent = forecast.time;
  };

  const updateExtraDOM = (forecast) => {
    $humidity.textContent = `${forecast.humidity}%`;
    $windSpeed.textContent = `${forecast.windSpeed} m/s`;
  };

  const updateDOM = () => {
    $cityInput.classList.remove('error');
    updateTemperatureDOM();
    const forecast = Forecast.getForecast();
    updateWeatherIcon(forecast);
    updateLocationDOM(forecast);
    updateExtraDOM(forecast);
  };

  const populateWeather = async () => {
    const cityName = getCityInput();
    if (!cityName) {
      showError('Please Enter a City');
      return;
    }
    loading(true);
    // Wait for data being fetched
    const OK = await Forecast.loadContents(cityName);
    loading(false);
    if (!OK) {
      showError('Location not found');
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
