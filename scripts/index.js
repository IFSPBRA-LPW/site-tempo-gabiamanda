console.log("JS funcionando");

import { API_KEY } from "./config.js";

async function fetchWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return response.json();
}


function adaptData(apiData) {
  return {
    city: apiData.location.name,
    country: apiData.location.country,
    date: apiData.location.localtime,
    temperature: `${apiData.current.temp_c}°C`,
    icon: "☀️",
    feelsLike: apiData.current.feelslike_c,
    humidity: apiData.current.humidity,
    wind: apiData.current.wind_kph,
    precipitation: apiData.current.precip_mm,

    daily: apiData.forecast.forecastday.map(day => ({
      day: day.date,
      icon: "☀️",
      max: day.day.maxtemp_c,
      min: day.day.mintemp_c
    })),

    hourly: apiData.forecast.forecastday[0].hour.map(hour => ({
      time: hour.time.split(" ")[1],
      icon: "☀️",
      temp: hour.temp_c
    }))
  };
}

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
    const item = document.createElement("li");
    item.classList.add("day-card");
    item.innerHTML = `${day.day} <br> ${day.icon} <br> ${day.max}° / ${day.min}°`;
    container.appendChild(item);
  });
}

// Por hora
function renderHourly(hourlyData) {
  const container = document.getElementById("hourly");
  container.innerHTML = "";

  hourlyData.forEach(hour => {
    const item = document.createElement("li");
    item.classList.add("hour-card");
    item.innerHTML = `${hour.icon} ${hour.time} <span>${hour.temp}°C</span>`;
    container.appendChild(item);
  });
}

// Função principal
function renderPage(data) {
  renderBannerInfo(data);
  renderDayInfo(data);
  renderDaily(data.daily);
  renderHourly(data.hourly);
}

// 🔹 Iniciar com cidade padrão
async function start() {
  const data = await fetchWeather("São Paulo");
  const adapted = adaptData(data);

  renderPage(adapted);
}

start();

// 🔹 Selecionar input e botão
const input = document.querySelector("#pesquisa input");
const button = document.querySelector("#pesquisa button");

// 🔹 Evento de busca
button.addEventListener("click", async () => {
  const city = input.value;

  if (!city) return;

  try {
    const data = await fetchWeather(city);
    const adapted = adaptData(data);

    renderPage(adapted);

    localStorage.setItem("cidade", city);
  } catch (error) {
    alert("Erro ao buscar cidade!");
    console.error(error);
  }
});

// 🔹 Carregar última cidade salva
window.addEventListener("load", async () => {
  const cidadeSalva = localStorage.getItem("cidade");

  if (cidadeSalva) {
    const data = await fetchWeather(cidadeSalva);
    const adapted = adaptData(data);

    renderPage(adapted);
  }
});