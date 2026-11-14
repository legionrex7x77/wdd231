// --- OpenWeatherMap API Integration ---
const apiKey = '796223f5f879d7701d3ca4f638972ab8'; 
const lat = '19.2627';
const lon = '-98.8953'; // Chalco coordinates

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentTempElem = document.querySelector('#current-temp');
const weatherDescElem = document.querySelector('#weather-desc');
const weatherIconElem = document.querySelector('#weather-icon');
const forecastContainer = document.querySelector('#forecast-container');

async function apiFetch() {
  try {
    // Fetch Current Weather
    const responseCurrent = await fetch(currentWeatherUrl);
    if (responseCurrent.ok) {
      const dataCurrent = await responseCurrent.json();
      displayCurrentWeather(dataCurrent);
    } else {
      throw Error(await responseCurrent.text());
    }

    // Fetch Forecast Weather
    const responseForecast = await fetch(forecastUrl);
    if (responseForecast.ok) {
      const dataForecast = await responseForecast.json();
      displayForecast(dataForecast);
    } else {
      throw Error(await responseForecast.text());
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherDescElem.textContent = 'Weather data unavailable';
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  currentTempElem.textContent = temp;
  
  const desc = data.weather[0].description;
  weatherDescElem.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  const iconCode = data.weather[0].icon;
  weatherIconElem.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
  weatherIconElem.setAttribute('alt', desc);
}

function displayForecast(data) {
  forecastContainer.innerHTML = '';
  
  // Filter forecast list for entries around 12:00 PM (noon) each day
  const middayForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
  
  middayForecasts.forEach(forecast => {
    const dateObj = new Date(forecast.dt * 1000);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(forecast.main.temp);
    
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('forecast-day');
    dayDiv.innerHTML = `
      <p><strong>${dayName}</strong></p>
      <p>${temp}°C</p>
    `;
    forecastContainer.appendChild(dayDiv);
  });
}

// --- Member Spotlights Logic ---
const spotlightsContainer = document.querySelector('#spotlights');

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const members = await response.json();
    
    // Filter members who are Gold (level 3) or Silver (level 2)
    const qualifiedMembers = members.filter(m => m.membershipLevel >= 2);
    
    // Randomize and select 2 or 3 members
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, 3);
    
    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error('Error loading spotlights:', error);
    spotlightsContainer.innerHTML = '<p class="error">Could not load business spotlights.</p>';
  }
}

function displaySpotlights(members) {
  spotlightsContainer.innerHTML = '';
  
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('spotlight-card');
    
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="80">
      <h3>${member.name}</h3>
      <p class="spotlight-level badge-${member.membershipLevel === 3 ? 'gold' : 'silver'}">${member.membershipName}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
    `;
    
    spotlightsContainer.appendChild(card);
  });
}

// Initialize API calls and data loading
apiFetch();
getSpotlights();