const weatherApi = {
  key: "eb316548e6e5146bd56febcf2f4b6c6f",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

const searchInputBox = document.getElementById('input-box');


searchInputBox.addEventListener('keypress', (event) => {

  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";
  }

});


function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
      return weather.json();
    }).then(showWeatherReport);
}


function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById('city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById('temp');
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById('min-max');
  minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

  let weatherType = document.getElementById('weather');
  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById('date');
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);


  if (weatherType.textContent == 'ccloud') {
    document.body.style.backgroundImage = "url('ccloud.jpg')";

  } else if (weatherType.textContent == 'cloud') {

    document.body.style.backgroundImage = "url('cloud.jpg')";

  } else if (weatherType.textContent == 'Haze') {

    document.body.style.backgroundImage = "url('cloud.jpg')";

  } else if (weatherType.textContent == 'rainy') {

    document.body.style.backgroundImage = "url('rainy.jpg')";

  } else if (weatherType.textContent == 'snow') {

    document.body.style.backgroundImage = "url('snow.jpg')";

  } else if (weatherType.textContent == 'thunder') {

    document.body.style.backgroundImage = "url('thunder.jpg')";

  }
}

// Date manage
function dateManage(dateArg) {

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
