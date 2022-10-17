function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let temp;

function search(city) {
  let apiKey = "b33c274bbf1108e005159bce13f6759c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#input");
  search(inputElement.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#currentTemperature");
  temp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temp;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let windElemenet = document.querySelector("#wind");
  windElemenet.innerHTML = Math.round(response.data.wind.speed);

  let overviewIconElement = document.querySelector("#overviewIcon");
  overviewIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  overviewIconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  let celsius = (temp * 5) / 9 - 32;
  temperatureElement.innerHTML = Math.round(celsius);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(temp);
}

// fahrenheitLink
// celsiusLink

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
