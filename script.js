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
let weatherIcon = document.getElementById("weatherIcon");

let toggleUnitBtn = document.getElementById("toggleUnitBtn");
let searchBtn = document.getElementById("searchButton");


searchBtn.addEventListener("click", fetchWeather);
toggleUnitBtn.addEventListener("click", changeCelciusToFahrenheit)

countryInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    fetchWeather();
  }
});

hideWeather();
let isCelsius = true;
let currentTemp = null;

async function fetchWeather() {
  
  const country = countryInput.value;

  if (!country) {
    showError("Please enter a country name");
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}&units=metric`;

  const fetching = await fetch(url)

  const data = await fetching.json();

  if (data.cod !== 200) {
    throw new Error(data.message);
  }
  displayWeather(data);
  toggleUnitBtn.disabled = false;
  }
  catch (error) {
    showError(error.message);
  }
}

function displayWeather (data) {
  console.log(data);
  errorCard.classList.add("hidden");

  currentTemp = data.main.temp;

  let countryName = data.name.trim();

  const icon = data.weather[0].icon;


  weatherHeading.textContent = `${countryName}'s Weather`;
  weatherParagraph.textContent = `☼Weather: ${data.weather[0].description}`
  weatherHumidity.textContent = `💧Humidity: ${data.main.humidity}%`;
  weatherWind.textContent = `🌬Wind Speed: ${data.wind.speed} m/s`;
  weatherTemperature.textContent = `🌡️Temperature ${Math.round(data.main.temp)}°C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

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
<<<<<<< HEAD
  toggleUnitBtn.disabled = true;

}
=======
}
>>>>>>> 84b1f802b9a42d5b758592fcec812ad269f024fe
