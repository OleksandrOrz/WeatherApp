let apiKey = "b0ce35cd54f47a37e37cfe580baaccdd";
// Поточний час
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = now.getHours();
let min = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (min < 10) {
  min = `0${min}`;
}
let time = document.querySelector("#time");
time.innerHTML = `${days[now.getDay()]} ${hour}:${min}`;

//функція виклику поточної температури
function showT(res) {
  let temp = document.querySelector("#temp1");
  temp.innerHTML = Math.round(res.data.main.temp);
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML =
    res.data.weather[0].description[0].toUpperCase() +
    res.data.weather[0].description.substring(1);
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = res.data.main.humidity;
  let windS = document.querySelector("#windS");
  windS.innerHTML = Math.round(res.data.wind.speed);
  let c = document.querySelector("#c");
  c.innerHTML = "°C";
  let city = document.querySelector("#city");

  city.innerHTML = res.data.name;
}

//вивід актуального міста
function cityS(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showT);
}

let city = document.querySelector("#search");
city.addEventListener("submit", cityS);

// Трансформація градусів
let temp = document.querySelector("#temp1");
function transform1() {
  let c = document.querySelector("#c");
  let temp = document.querySelector("#temp1");
  if (c.innerHTML === "°F") {
  } else {
    temp.innerHTML = `${Math.round(temp.innerHTML * 1.8 + 32)}`;
    c.innerHTML = "°F";
  }
}
function transform2() {
  let c = document.querySelector("#c");
  let temp = document.querySelector("#temp1");
  if (c.innerHTML === "°F") {
    temp.innerHTML = `${Math.round((temp.innerHTML - 32) / 1.8)}`;
    c.innerHTML = "°C";
  }
}

let far = document.querySelector("#far");
far.addEventListener("click", transform1);
let cel = document.querySelector("#cel");
cel.addEventListener("click", transform2);

// Погода в поточній локації
function showPosition(pos) {
  let lat = pos.coords.latitude;
  let lon = pos.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showT);
}
function currentLW(event) {
  event.preventDefault();
  let n = navigator.geolocation.getCurrentPosition(showPosition);
}
let currentL = document.querySelector("#currentL");
currentL.addEventListener("click", currentLW);
