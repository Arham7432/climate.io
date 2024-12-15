const mainCard = document.querySelector(".w-card");
const temperature = document.querySelector("#temp h1");
const date = document.querySelector("#date");
const input = document.querySelector(".search-input");
const humidity = document.querySelector("#h-value");
const windSpeed = document.querySelector("#ws-value");
const cityElement = document.querySelector("#city");
const countryElement = document.querySelector("#country");
const cloudElement = document.querySelector("#cloud");
const weatherIcon = document.querySelector(".w-img img");
const futureTemp = document.querySelectorAll(".future-temp")
const apiKey = '6779b40b81ab6d685cc49c7e23a13018';

date.innerHTML = new Date().toLocaleDateString();

function srch() {


    setTimeout(() => {
        input.value = ""
    }, 2000);
    
    const city = input.value.trim();

    if (!city) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a city name!',
            theme: 'dark'
        });
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found or invalid API request.");
            }
            return response.json();
        })
        .then(data => {
            if (data.main && data.weather && data.sys) {
                const tempInCelsius = Math.round(data.main.temp - 273.15);
                temperature.innerHTML = `${tempInCelsius}°C`;




                humidity.innerHTML = `${data.main.humidity}%`;
                windSpeed.innerHTML = `${data.wind.speed} m/s`;
                cityElement.innerHTML = data.name;
                countryElement.innerHTML = data.sys.country;
                cloudElement.innerHTML = `${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}`;

                updateWeatherIcon(data.weather[0].main);

                const beginStatement = document.querySelector("#begin-statement");
                mainCard.style.display = "block";
                beginStatement.style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please check the city name or try again later.',
                theme: 'dark'
            });
        });
}

function updateWeatherIcon(weatherCondition) {
    weatherCondition = weatherCondition.toLowerCase();
    if (weatherCondition === 'clear') {
        weatherIcon.src = "images/clear.png";
    } else if (weatherCondition === 'clouds') {
        weatherIcon.src = "images/cloudy.png";
    } else if (weatherCondition === 'rain') {
        weatherIcon.src = "images/rain.png";
    } else if (weatherCondition === 'snow') {
        weatherIcon.src = "images/snow.png";
    } else if (weatherCondition === 'haze') {
        weatherIcon.src = "images/haze.png";
    } else {
        weatherIcon.src = "images/partlyCloudy.png";
    }
}

document.querySelector('.search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        srch();
    }
});

