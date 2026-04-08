const calendarGridEl = document.getElementById("calendarGrid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const todayBtn = document.getElementById("todayBtn");
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");
const appBg = document.querySelector(".app-bg");
const seasonFx = document.getElementById("seasonFx");

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

const noteModal = document.getElementById("noteModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalDateLabel = document.getElementById("modalDateLabel");
const eventInput = document.getElementById("eventInput");
const addEventBtn = document.getElementById("addEventBtn");
const eventList = document.getElementById("eventList");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const state = {
  currentDate: new Date(),
  selectedISODate: "",
  weatherMode: null
};

const apiKey = "e19415c27a9d978587e3d7771dc00810";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const seasonBackgrounds = {
  winter: [
    "url('https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1600&q=80')"
  ],
  spring: [
    "url('https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1600&q=80')"
  ],
  summer: [
    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80')"
  ],
  monsoon: [
    "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1438449805896-28a666819a20?auto=format&fit=crop&w=1600&q=80')"
  ],
  autumn: [
    "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1600&q=80')",
    "url('https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?auto=format&fit=crop&w=1600&q=80')"
  ]
};

const weatherBackgrounds = {
  rain:
    "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1600&q=80')",
  clear:
    "url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=80')",
  clouds:
    "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1600&q=80')"
};

const weatherCartoons = {
  clear: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/2600.png",
  clouds: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/2601.png",
  rain: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f327.png",
  drizzle: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f4a7.png",
  thunderstorm: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/26c8.png",
  snow: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/2744.png",
  mist: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f32b.png",
  cold: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f976.png",
  fallback: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f324.png"
};

function getSeason(monthIndex) {
  if (monthIndex === 11 || monthIndex === 0 || monthIndex === 1) return "winter";
  if (monthIndex === 2 || monthIndex === 3) return "spring";
  if (monthIndex === 4 || monthIndex === 5) return "summer";
  if (monthIndex === 6 || monthIndex === 7) return "monsoon";
  return "autumn";
}

function getLocalStorageNotes() {
  try {
    const raw = localStorage.getItem("calendarEvents");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalStorageNotes(notes) {
  localStorage.setItem("calendarEvents", JSON.stringify(notes));
}

function formatISODate(year, monthIndex, dayNum) {
  const month = String(monthIndex + 1).padStart(2, "0");
  const day = String(dayNum).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateDayNightMode() {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  document.body.classList.toggle("day", isDay);
  document.body.classList.toggle("night", !isDay);
}

function setBackgroundImage() {
  if (state.weatherMode && weatherBackgrounds[state.weatherMode]) {
    appBg.style.backgroundImage = weatherBackgrounds[state.weatherMode];
    renderSeasonFx(state.weatherMode);
    return;
  }

  const season = getSeason(state.currentDate.getMonth());
  const seasonImages = seasonBackgrounds[season];
  const seasonalIndex = state.currentDate.getMonth() % seasonImages.length;
  appBg.style.backgroundImage = seasonImages[seasonalIndex];
  renderSeasonFx(season);
}

function renderSeasonFx(mode) {
  seasonFx.innerHTML = "";
  let count = 0;
  let className = "";

  if (mode === "winter") {
    count = 26;
    className = "fx-snow";
  } else if (mode === "autumn" || mode === "spring") {
    count = 18;
    className = "fx-leaf";
  } else if (mode === "monsoon" || mode === "rain" || mode === "clouds") {
    count = 28;
    className = "fx-drop";
  } else if (mode === "summer" || mode === "clear") {
    count = 14;
    className = "fx-sun";
  }

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    particle.className = `fx-particle ${className}`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${6 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.opacity = `${0.25 + Math.random() * 0.55}`;
    seasonFx.appendChild(particle);
  }
}

function setupDateControls() {
  monthSelect.innerHTML = "";
  yearSelect.innerHTML = "";

  monthNames.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  const currentYear = new Date().getFullYear();
  for (let year = currentYear - 100; year <= currentYear + 100; year += 1) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearSelect.appendChild(option);
  }
}

function syncDateControls() {
  monthSelect.value = String(state.currentDate.getMonth());
  yearSelect.value = String(state.currentDate.getFullYear());
}

function renderEventList(isoDate) {
  const eventsMap = getLocalStorageNotes();
  const events = Array.isArray(eventsMap[isoDate]) ? eventsMap[isoDate] : [];
  eventList.innerHTML = "";

  if (!events.length) {
    const empty = document.createElement("li");
    empty.className = "event-empty";
    empty.textContent = "No events yet.";
    eventList.appendChild(empty);
    return;
  }

  events.forEach((eventText, index) => {
    const item = document.createElement("li");
    item.className = "event-item";

    const text = document.createElement("span");
    text.textContent = eventText;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "event-delete-btn";
    removeBtn.textContent = "Delete";
    removeBtn.addEventListener("click", () => deleteEventForSelectedDate(index));

    item.appendChild(text);
    item.appendChild(removeBtn);
    eventList.appendChild(item);
  });
}

function renderCalendar() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const notes = getLocalStorageNotes();

  syncDateControls();
  calendarGridEl.innerHTML = "";

  for (let i = 0; i < firstDay; i += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "empty";
    calendarGridEl.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dayCell = document.createElement("button");
    dayCell.type = "button";
    dayCell.className = "day-cell";
    dayCell.textContent = day;

    const isoDate = formatISODate(year, month, day);
    const dayOfWeek = new Date(year, month, day).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    if (isToday) dayCell.classList.add("today");
    if (isWeekend) dayCell.classList.add("weekend");
    const events = Array.isArray(notes[isoDate]) ? notes[isoDate] : [];
    if (events.length) {
      dayCell.classList.add("has-note");
      const dot = document.createElement("span");
      dot.className = "event-dot";
      dayCell.appendChild(dot);
    }

    dayCell.addEventListener("click", () => openNoteModal(isoDate));
    calendarGridEl.appendChild(dayCell);
  }

  setBackgroundImage();
}

function openNoteModal(isoDate) {
  state.selectedISODate = isoDate;
  modalDateLabel.textContent = `Events for ${isoDate}`;
  eventInput.value = "";
  renderEventList(isoDate);
  noteModal.classList.remove("hidden");
  eventInput.focus();
}

function closeNoteModal() {
  noteModal.classList.add("hidden");
  state.selectedISODate = "";
}

function addEventForSelectedDate() {
  if (!state.selectedISODate) return;
  const value = eventInput.value.trim();
  if (!value) return;

  const notes = getLocalStorageNotes();
  const events = Array.isArray(notes[state.selectedISODate]) ? notes[state.selectedISODate] : [];
  events.push(value);
  notes[state.selectedISODate] = events;

  saveLocalStorageNotes(notes);
  eventInput.value = "";
  renderEventList(state.selectedISODate);
  renderCalendar();
}

function deleteEventForSelectedDate(index) {
  if (!state.selectedISODate) return;
  const notes = getLocalStorageNotes();
  const events = Array.isArray(notes[state.selectedISODate]) ? notes[state.selectedISODate] : [];
  events.splice(index, 1);

  if (events.length) {
    notes[state.selectedISODate] = events;
  } else {
    delete notes[state.selectedISODate];
  }

  saveLocalStorageNotes(notes);
  renderEventList(state.selectedISODate);
  renderCalendar();
}

function getWeatherVisualMode(weatherMain, temperature) {
  const normalized = weatherMain.toLowerCase();

  if (normalized.includes("thunder")) return "thunderstorm";
  if (normalized.includes("drizzle")) return "drizzle";
  if (normalized.includes("rain")) return "rain";
  if (normalized.includes("snow")) return "snow";
  if (
    normalized.includes("mist") ||
    normalized.includes("haze") ||
    normalized.includes("fog") ||
    normalized.includes("smoke") ||
    normalized.includes("dust") ||
    normalized.includes("sand") ||
    normalized.includes("ash")
  ) {
    return "mist";
  }
  if (normalized.includes("cloud")) return "clouds";
  if (Number.isFinite(temperature) && temperature <= 10) return "cold";
  if (normalized.includes("clear")) return "clear";
  return "fallback";
}

async function fetchWeather(city) {
  if (!apiKey) {
    weatherInfo.textContent = "API key is missing.";
    return;
  }

  weatherInfo.textContent = "Fetching weather...";
  const endpoint =
    `${apiUrl}?q=${encodeURIComponent(city)}` +
    `&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Could not fetch weather for this city.");
    }

    const data = await response.json();
    const weatherMain = (data.weather?.[0]?.main || "").toLowerCase();
    const temperature = Math.round(data.main?.temp);
    const description = data.weather?.[0]?.description || "N/A";
    const cityName = data.name || city;

    if (
      weatherMain.includes("rain") ||
      weatherMain.includes("drizzle") ||
      weatherMain.includes("thunder") ||
      weatherMain.includes("snow")
    ) {
      state.weatherMode = "rain";
    } else if (weatherMain.includes("cloud")) {
      state.weatherMode = "clouds";
    } else if (weatherMain.includes("clear")) {
      state.weatherMode = "clear";
    } else {
      state.weatherMode = null;
    }

    setBackgroundImage();
    const weatherVisualMode = getWeatherVisualMode(weatherMain, temperature);
    const weatherArt = weatherCartoons[weatherVisualMode] || weatherCartoons.fallback;

    weatherInfo.innerHTML = `
      <div class="weather-visual">
        <img src="${weatherArt}" alt="${weatherVisualMode} weather icon">
        <div>
          <strong>${cityName}</strong><br>
          ${temperature}°C, ${description}
        </div>
      </div>
    `;
  } catch (error) {
    weatherInfo.textContent = error.message || "Weather fetch failed.";
    state.weatherMode = null;
    setBackgroundImage();
  }
}

function addEventListeners() {
  prevBtn.addEventListener("click", () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    renderCalendar();
  });

  todayBtn.addEventListener("click", () => {
    state.currentDate = new Date();
    renderCalendar();
  });

  monthSelect.addEventListener("change", () => {
    state.currentDate.setMonth(Number(monthSelect.value));
    renderCalendar();
  });

  yearSelect.addEventListener("change", () => {
    state.currentDate.setFullYear(Number(yearSelect.value));
    renderCalendar();
  });

  weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
      weatherInfo.textContent = "Please enter a city name.";
      return;
    }
    fetchWeather(city);
  });

  closeModalBtn.addEventListener("click", closeNoteModal);
  addEventBtn.addEventListener("click", addEventForSelectedDate);

  eventInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addEventForSelectedDate();
    }
  });

  noteModal.addEventListener("click", (event) => {
    if (event.target === noteModal) closeNoteModal();
  });
}

function init() {
  setupDateControls();
  updateDayNightMode();
  setInterval(updateDayNightMode, 60 * 1000);
  addEventListeners();
  renderCalendar();
}

init();
