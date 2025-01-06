document.getElementById("get-weather").addEventListener("click", function() {
    const city = document.getElementById("city").value;
    
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    //Fetching weather data from API
    getWeather(city);
});

function getWeather(city) {
    const apiKey = "29f102510b51cc28d501cb7765dd61fe"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

    // Make the API request
    fetch(url)
    .then(reponse => reponse.json())
    .then(data => {
        if (data.cod === "404") {
            alert("City not found!");
            return;
        }
        //Display weather data
        displayWeather(data);
    })
    .catch(error => {
        console.error("Error fetching the weather data:", error);
        alert("Failed to fetch weather data. Please try again.");
    });
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weather-result");

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;

    weatherResult.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p><strong>Temperature;</strong> ${temp} °F</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}