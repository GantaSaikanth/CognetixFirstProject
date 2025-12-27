// const API_KEY = "5972e9274ced4dd49cc9cec27723758e";

// const cityInput = document.getElementById("cityInput");
// const searchBtn = document.getElementById("searchBtn");
// const weatherCard = document.getElementById("weatherCard");
// const errorBox = document.getElementById("error");

// const cityNameEl = document.getElementById("cityName");
// const temperatureEl = document.getElementById("temperature");
// const unitEl = document.getElementById("unit");
// const descriptionEl = document.getElementById("description");
// const humidityEl = document.getElementById("humidity");
// const windEl = document.getElementById("wind");
// const weatherIconEl = document.getElementById("weatherIcon");
// const toggleUnitBtn = document.getElementById("toggleUnit");

// let isCelsius = true;
// let currentTempC = null;

// searchBtn.addEventListener("click", fetchWeather);
// toggleUnitBtn.addEventListener("click", toggleUnit);

// async function fetchWeather() {
//   const city = cityInput.value.trim();
//   console.log(city)

//   if (!city) {
//     showError("Please enter a city name");
//     return;
//   }

//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     );

//     if (!response.ok) {
//       throw new Error("City not found");
//     }

//     const data = await response.json();
//     displayWeather(data);
//   } catch (error) {
//     showError(error.message);
//   }
// }

// function displayWeather(data) {
//   hideError();

//   currentTempC = data.main.temp;
//   isCelsius = true;

//   cityNameEl.textContent = data.name;
//   temperatureEl.textContent = Math.round(currentTempC);
//   unitEl.textContent = "°C";
//   descriptionEl.textContent = data.weather[0].description;
//   humidityEl.textContent = `${data.main.humidity}%`;
//   windEl.textContent = `${data.wind.speed} m/s`;

//   const iconCode = data.weather[0].icon;
//   weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

//   toggleUnitBtn.textContent = "Switch to °F";
//   weatherCard.classList.remove("hidden");
// }

// function toggleUnit() {
//   if (currentTempC === null) return;

//   if (isCelsius) {
//     const tempF = (currentTempC * 9) / 5 + 32;
//     temperatureEl.textContent = Math.round(tempF);
//     unitEl.textContent = "°F";
//     toggleUnitBtn.textContent = "Switch to °C";
//   } else {
//     temperatureEl.textContent = Math.round(currentTempC);
//     unitEl.textContent = "°C";
//     toggleUnitBtn.textContent = "Switch to °F";
//   }

//   isCelsius = !isCelsius;
// }

// function showError(message) {
//   errorBox.textContent = message;
//   errorBox.classList.remove("hidden");
//   weatherCard.classList.add("hidden");
// }

// function hideError() {
//   errorBox.classList.add("hidden");
// }


const API_KEY  = "5972e9274ced4dd49cc9cec27723758e";

let countryInput = document.getElementById("countryInput");

let weatherHeading = document.getElementById("weatherHeading");
let weatherParagraph = document.getElementById("weatherParagraph");
let weatherContent = document.getElementById("weatherContent");
let weatherHumidity = document.getElementById("weatherHumidity");
let weatherWind = document.getElementById("weatherWind");
let weatherTemperature = document.getElementById("weatherTemperature");
let errorCard = document.getElementById("errorCard");
let errorMessage = document.getElementById("errorMessage");

let toggleUnitBtn = document.getElementById("toggleUnitBtn");
let searchBtn = document.getElementById("searchButton");


searchBtn.addEventListener("click", fetchWeather);
toggleUnitBtn.addEventListener("click", changeCelciusToFahrenheit)

hideWeather();
let isCelsius = true;
let currentTemp = null;

async function fetchWeather() {
  
  const country = countryInput.value;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}&units=metric`;

  const fetching = await fetch(url)

  const data = await fetching.json();

  if (data.cod !== 200) {
    throw new Error(data.message);
  }
  displayWeather(data);
  }
  catch (error) {
    showError(error.message);
  }
}

function displayWeather (data) {
  console.log(data);
  errorCard.classList.add("hidden");

  currentTemp = data.main.temp;


  weatherHeading.textContent = `${data.name}`
  weatherParagraph.textContent = `☼Weather: ${data.weather[0].description}`
  weatherHumidity.textContent = `💧Humidity: ${data.main.humidity}%`;
  weatherWind.textContent = `🌬Wind Speed: ${data.wind.speed} m/s`;
  weatherTemperature.textContent = `🌡️Temperature ${Math.round(data.main.temp)}°C`;

  weatherContent.classList.remove("hidden");
}

function changeCelciusToFahrenheit () {
  const temperatureFarenheit = (currentTemp * 9 / 5) + 32;
  const temperatureCelsius = (temperatureFarenheit - 32) * 5 / 9;
  console.log(temperatureCelsius, temperatureFarenheit)
  if (!isCelsius) {
    weatherTemperature.textContent = `🌡️Temperature: ${Math.round(temperatureCelsius)}°C`;
    toggleUnitBtn.textContent = "Switch to °F";
    
    isCelsius = !isCelsius;
  }
  else {
    weatherTemperature.textContent = `🌡️Temperature: ${Math.round(temperatureFarenheit)}°F`;
    toggleUnitBtn.textContent = "Switch to °C";
    isCelsius = !isCelsius;
  }

}

function showError (message) {
  errorMessage.textContent = message;
  errorCard.classList.remove("hidden");
  hideWeather();
}

function hideWeather () {
  weatherContent.classList.add("hidden");
}