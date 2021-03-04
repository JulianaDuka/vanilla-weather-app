function formatDate (timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = '0${hours}';
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0${minutes}';
    }
    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    let day = days[date.getDate()];
    return '${day} ${hours}:${minutes}';
}

function displayTemperature (response) {
    
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
   
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");;
    iconElement.setAttribute(
        "src", 'https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png');
    
    iconElement.setAttribute("alt", response.data.weather[0].description);
    }

    function search(city){

    let apiKey = "26d501c81f131b6f85b70c0c1e1bb6fc";
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric';
    axios.get(apiUrl).then(displayTemperature);

    }

    function handleSubmit (event){
        event.preventDefault();
        let cityInputElement = document.querySelector("#city-input");
        search(cityInputElement.value);
    }

    search("Skopje");

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);
