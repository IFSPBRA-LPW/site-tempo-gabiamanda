console.log("JS funcionando");
import { cityWeather } from "./data.js";

// Banner
function renderBannerInfo(data) {
  const banner = document.getElementById("banner");

  banner.innerHTML = `
    <h1>${data.city}, ${data.country}</h1>
    <p>${data.date}</p>
    <h2>${data.icon} ${data.temperature}°C</h2>
  `;
}

// Infos do dia
function renderDayInfo(data) {
  const container = document.getElementById("day-info");

  container.innerHTML = `
    <p>Sensação térmica: ${data.feelsLike}°C</p>
    <p>Umidade: ${data.humidity}%</p>
    <p>Vento: ${data.wind} km/h</p>
    <p>Precipitação: ${data.precipitation}%</p>
  `;
}

// Próximos dias
function renderDaily(dailyData) {
  const container = document.getElementById("daily");
  container.innerHTML = "";

  dailyData.forEach(day => {
    const card = document.createElement("div");
    card.classList.add("day-card");

    card.innerHTML = `
      <p>${day.day}</p>
      <p>${day.icon}</p>
      <p>${day.max}° / ${day.min}°</p>
    `;

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
      <p>${hour.time}</p>
      <p>${hour.temp}°C</p>
    `;

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