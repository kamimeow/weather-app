const apiKey = "61cfedc1c5b310f069fbc929d1a3761e";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityNameElement = document.querySelector(".weather__city");
const cityWeatherElement = document.querySelector(".weather__tempr");
const cityHumidityElement = document.querySelector(".details__humidity");
const windSpeedElement = document.querySelector(".details__wind");

const searchInput = document.querySelector(".card__search input");
const searchButton = document.querySelector(".card__search button");

const weatherIconElement = document.querySelector(".weather__icon");

const errorElement = document.querySelector(".card__error");
const weatherCardElement = document.querySelector(".card__weather");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    errorElement.style.display = "block";
    weatherCardElement.style.display = "none";
  } else {
    var data = await response.json();

    cityNameElement.innerHTML = data.name;
    cityWeatherElement.innerHTML = Math.round(data.main.temp) + "°C";
    cityHumidityElement.innerHTML = data.main.humidity + "%";
    windSpeedElement.innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIconElement.src = "/images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIconElement.src = "/images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIconElement.src = "/images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIconElement.src = "/images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIconElement.src = "/images/mist.png";
    }

    weatherCardElement.style.display = "block";
    errorElement.style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
});
