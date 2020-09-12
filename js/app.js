const api = {
  key: "c31be42cea878df4f407411b98eb3638",
  baseurl: "https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e){
  if(e.keyCode == 13){
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}


function getResults (query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

function displayResults (weather) {

  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText= `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}


function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", 'August', "Septmber", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;

}