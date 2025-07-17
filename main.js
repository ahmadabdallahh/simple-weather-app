// TODO: Weather App

/*
    API key About Weather App
    API key : 30af5862b41ed4a540c6b8060cabc071
    API Link : https://api.openweathermap.org/data/2.5/weather?q=germany&appid=775ad20fbfcc5622e1aa3ce2b51b1c3e&units=metric
*/

const tempElement = document.querySelector('.temperature');
const city = document.querySelector('.city');
const humidityValue = document.querySelector('.humidity-value');
const winSpeed = document.querySelector('.win-speed');
const searchBox = document.querySelector('#searchBox');
const searchBtn = document.querySelector('.search-btn');
const weatherIcon = document.querySelector('.weather-icon img');
const formElement = document.forms[0];
const weatherContainer = document.querySelector('.weather-container');
const errorMsg = document.querySelector('.error');

const apiKey = `775ad20fbfcc5622e1aa3ce2b51b1c3e`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

async function checkWeather(searchBox) {
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${searchBox}`);

  if (response.status === 404) {
    errorMsg.style.display = 'block';
    weatherContainer.style.display = "none"
  } else {
    let data = await response.json();
    console.log(data);

    tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
    city.innerHTML = data.name;
    humidityValue.innerHTML = `${data.main.humidity}%`;
    winSpeed.innerHTML = `${data.wind.speed} KM/H`;

    if (data.weather[0].main === 'Clouds') {
      weatherIcon.src = `images/cloudy-weather.svg`;
    } else if (data.weather[0].main === 'Clear') {
      weatherIcon.src = `images/sun-icon.svg`;
    } else if (data.weather[0].main === 'Rain') {
      weatherIcon.src = `images/rain-weather.svg`;
    } else if (data.weather[0].main === 'Drizzle') {
      weatherIcon.src = `images/drizzle-weather.svg`;
    } else if (data.weather[0].main === 'Mist') {
      weatherIcon.src = `images/mist-weather.svg`;
    }
    weatherContainer.style.display = 'block';
    errorMsg.style.display = 'none';
  }
}

formElement.addEventListener('submit', (e) => e.preventDefault());

searchBtn.addEventListener('click', () => checkWeather(searchBox.value));
