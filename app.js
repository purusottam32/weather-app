
    const cloud="/img/cloud.png"
   const clear="/img/clear.png"
    const mist="/img/mist.png"
    const rain="/img/rain.png"

 let imgSrc= document.getElementById("imgsrc");
 let locations = document.getElementById("location");
 let temp = document.getElementById("temp");
 let times = document.getElementById("time");
 let wstatus = document.getElementById("status");
 let sr =document.getElementById("sr");
 let st =document.getElementById("st");

document.addEventListener("DOMContentLoaded", async function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const apiKey = "90cd13c6c777169fe48456c291385bd5"; // Replace with your API key
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Weather data fetch failed");
                }
                const data = await response.json();

                console.log("Weather Data:", data);
                locations.innerText=data.name;
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                times.innerText=currentTime;
                console.log("Location:", data.name);
                temp.innerText=data.main.temp
                console.log("Temperature:", data.main.temp + "°C");
                wstatus.innerText= data.weather[0].description;
                console.log("Weather Status:", data.weather[0].description);
                sr.innerText=new Date(data.sys.sunrise * 1000).toLocaleTimeString();
                console.log("Sunrise:", new Date(data.sys.sunrise * 1000).toLocaleTimeString());
                st.innerText=new Date(data.sys.sunset * 1000).toLocaleTimeString();
                console.log("Sunset:", new Date(data.sys.sunset * 1000).toLocaleTimeString());
                
                // Display the weather data on the page
                const weatherData = {
                    weather: [{ icon: "02n" }] // Icon code from OpenWeatherMap API
                  };
            
                    const iconCode = weatherData.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // OpenWeatherMap icon URL
                    imgSrc.src = iconUrl;
                  
               
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }, (error) => {
            console.error("Error getting location:", error);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});
