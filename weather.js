const API_KEY = "1389f640052fd43e781ae1dc8d0c1799";
const weather = document.querySelector(".js-weather");
const COORDS = 'coords';

function getWeather(lat, lng) {
  fetch(
    `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response) {
    return response.json();
  }).then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}


function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log('Can`t access geo location');
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function askForCoord() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    askForCoord();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}


function init() {
  loadCoords();
}

init();