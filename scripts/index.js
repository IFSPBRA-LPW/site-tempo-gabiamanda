console.log("JS funcionando");
import { cityWeather } from "./data.js";

// Banner
function renderBannerInfo(data) {
  const banner = document.getElementById("banner");

  banner.innerHTML = `
  <div>
    <h2>${data.city}, ${data.country}</h2>
    <p>${data.date}</p>
    </div>

    <div>
    <p id="clima">${data.icon} ${data.temperature}</p>
    </div>`;
}

// Infos do dia
function renderDayInfo(data) {
  const container = document.getElementById("day-info");

  container.innerHTML = `
    <li>
      <p>Feels Like</p>
      <span>${data.feelsLike}°C</span>
    </li>

    <li>
      <p>Humidity</p>
      <span>${data.humidity}%</span>
    </li>

    <li>
      <p>Wind</p>
      <span>${data.wind}Km/h</span>
    </li>

    <li>
      <p>Precipitation</p>
      <span>${data.precipitation}mm</span>
    </li>`;
}

// Próximos dias
function renderDaily(dailyData) {
  const container = document.getElementById("daily");
  container.innerHTML = "";

  dailyData.forEach(day => {
    const card = document.createElement("div");
    card.classList.add("day-card");

    card.innerHTML = `
      <li>${day.day} <br> ${day.icon} <br> ${day.max}° / ${day.min}°</li>`;

    container.appendChild(card);
  });
}

// Por hora
function renderHourly(hourlyData) {
  const container = document.getElementById("hourly");
  container.innerHTML = "";

  hourlyData.forEach(hour => {
    const card = document.createElement("div");
    card.classList.add("hour-card");

    card.innerHTML = `
      <li>${hour.icon} ${hour.time} 
      <span>${hour.temp}°C</span></li>`;

    container.appendChild(card);
  });
}

// Função principal
function renderPage(data) {
  renderBannerInfo(data);
  renderDayInfo(data);
  renderDaily(data.daily);
  renderHourly(data.hourly);
}

// chamada final
renderPage(cityWeather);