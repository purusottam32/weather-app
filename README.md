# Weather App

A simple weather application that fetches real-time weather data based on the user's current location using the OpenWeatherMap API.

## Features
- Displays current temperature, weather status, sunrise and sunset times.
- Fetches location automatically using Geolocation API.
- Uses OpenWeatherMap icons to represent weather conditions.
- Stores weather data in local storage to prevent empty/default content on refresh.

## Technologies Used
- **HTML, CSS, JavaScript** for the front-end.
- **OpenWeatherMap API** for fetching weather data.
- **Geolocation API** for detecting user location.
- **LocalStorage** for caching weather data.

## Installation
1. Clone this repository:
   
   git clone https://github.com/purusottam32/weather-app.git
  
2. Navigate to the project directory:
   
   cd weather-app
   
3. Open `index.html` in a browser.

## Usage
1. Allow location access when prompted.
2. The app will fetch weather data for your current location.
3. The UI will update with weather conditions, temperature, and sunrise/sunset times.

## API Key Setup
Replace the placeholder `apiKey` in `app.js` with your OpenWeatherMap API key:
```javascript
const apiKey = "YOUR_API_KEY_HERE";
```

## Demo
If you want to see a live demo, you can host it on GitHub Pages or Netlify.


---

Feel free to modify and enhance this project as needed!

