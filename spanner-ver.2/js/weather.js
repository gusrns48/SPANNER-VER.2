const weather = document.querySelector(".js-weather");

const COORD = "coords";
const API_KEY = "ef7b447daf1ba5744105fa7b26ba4288";
const IMG_BASE_URL = "http://openweathermap.org/img/wn/";

function getIconElement() {}

function getWeatherImg(imgName) {
  const imgSrc = `${IMG_BASE_URL}${imgName}@2x.png`;
  const img = document.createElement("img");
  img.alt = imgName;
  img.src = imgSrc;
  return img;
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      if (json && json.weather && json.weather.length == 1) {
        const img = getWeatherImg(json.weather[0].icon);
        weather.appendChild(img);
      }
      const span = document.createElement("span");
      span.innerText = `${Math.round(temperature)}กษ @ ${place}`;

      weather.appendChild(span);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORD, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORD);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
