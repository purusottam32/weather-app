// Define image variables globally
const cloud = "/img/cloud.png";
const clear = "/img/clear.png";
const mist = "/img/mist.png";
const rain = "/img/rain.png";
const moon = "/img/moon.png";  // ✅ Now properly defined

// Get elements once at the top
let imgSrc = document.getElementById("imgsrc");
let locations = document.getElementById("location");
let temp = document.getElementById("temp");
let times = document.getElementById("time");
let wstatus = document.getElementById("status");
let sr = document.getElementById("sr");
let st = document.getElementById("st");

document.addEventListener("DOMContentLoaded", async function () {
    const savedWeather = localStorage.getItem("weatherData");

    if (savedWeather) {
        updateUI(JSON.parse(savedWeather)); // Load saved data
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const apiKey = "90cd13c6c777169fe48456c291385bd5"; 
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Weather data fetch failed");

                const data = await response.json();
                localStorage.setItem("weatherData", JSON.stringify(data)); 
                localStorage.setItem("lastFetch", Date.now()); 
                updateUI(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }, (error) => console.error("Error getting location:", error));
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});

function updateUI(data) {
    if (!locations || !temp || !times || !wstatus || !sr || !st || !imgSrc) {
        console.error("One or more DOM elements are missing.");
        return;
    }

    locations.innerText = data.name;
    times.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    temp.innerText = `${data.main.temp}°C`;
    wstatus.innerText = data.weather[0].description;

    sr.innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    st.innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const now = Math.floor(new Date().getTime() / 1000);
    const sunriseTime = data.sys.sunrise;
    const sunsetTime = data.sys.sunset;

    // ✅ Fix: Ensure `moon` and `clear` are defined
    imgSrc.src = now >= sunriseTime && now < sunsetTime ? clear : moon;

    // Use OpenWeather icons
    const iconCode = data.weather[0].icon;
    imgSrc.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
