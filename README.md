# 📅 Interactive Calendar Web App

An advanced **Interactive Calendar Web Application** built using **HTML, CSS, and JavaScript**.
This project combines **calendar functionality, event management, weather integration, and dynamic UI effects** to create a modern, real-world frontend application.

---

## 🚀 Live Demo

🔗 https://tanusree0.github.io/interactive-calendar/

---

## 📌 Overview

This application allows users to:

* View and navigate a monthly calendar
* Add and manage events for specific dates
* Fetch real-time weather data for any city
* Experience dynamic UI changes based on **time, season, and weather**

---

## ✨ Features

### 📆 Calendar System

* Dynamic monthly calendar rendering
* Navigation:

  * Previous / Next month
  * Month & Year dropdown selection
  * “Today” button for quick navigation
* Correct weekday alignment using JavaScript Date API

---

### 📝 Event Management

* Click on any date to open event modal
* Add multiple events per day
* Delete events easily
* Events stored in **LocalStorage**
* Visual indicator (dot) for dates with events

---

### 🌦 Weather Integration

* Fetch real-time weather using **OpenWeather API**
* Displays:

  * City name
  * Temperature (°C)
  * Weather description
* Dynamic cartoon-style weather icons

---

### 🌈 Dynamic Background System

Background changes dynamically based on:

**Priority Logic:**

```
Weather > Season
```

* Weather-based backgrounds:

  * Rain 🌧
  * Clear ☀
  * Clouds ☁
* Seasonal backgrounds:

  * Winter ❄
  * Spring 🌸
  * Summer 🌞
  * Monsoon 🌧
  * Autumn 🍂

---

### ✨ Seasonal Animations

* Snowfall (Winter)
* Falling leaves (Spring/Autumn)
* Rain drops (Monsoon)
* Sun particles (Summer)

---

### 🌙 Day / Night Mode

* Automatically switches based on system time:

  * Day → Light overlay
  * Night → Dark overlay

---

### 🎨 Modern UI Design

* Glassmorphism design
* Smooth transitions and hover effects
* Fully responsive layout (Mobile + Desktop)

---

## 🛠 Tech Stack
--------------------------------------------------------------
| Technology           | Usage                               |
| -------------------- | ----------------------------------- |
| HTML5                | Structure                           |
| CSS3                 | Styling, animations, responsiveness |
| JavaScript (Vanilla) | Logic & interactivity               |
| OpenWeather API      | Weather data                        |
| LocalStorage         | Event persistence                   |
--------------------------------------------------------------
---

## 📂 Project Structure

```
📁 interactive-calendar
│── index.html      # App structure
│── style.css       # UI styling & animations
│── script.js       # Core logic
```

---

## ⚙️ Core Concepts Used

### 📅 Calendar Rendering Logic

* Uses JavaScript `Date` object
* Calculates:

  * First day of month
  * Total days in month
* Formula:

```js
new Date(year, month + 1, 0).getDate()
```

---

### 🧠 State Management

```js
const state = {
  currentDate: new Date(),
  selectedISODate: "",
  weatherMode: null
};
```

Controls:

* Current calendar view
* Selected date
* Weather UI mode

---

### 💾 LocalStorage Data Format

```json
{
  "2026-04-08": ["Meeting", "Gym"]
}
```

---

### 🌦 Weather API Flow

1. User enters city
2. API request sent
3. Response parsed
4. UI + background updated

---

### 🎨 Dynamic UI Logic

* Weather overrides seasonal background
* CSS classes dynamically added:

  * `today`
  * `weekend`
  * `has-note`

---

## 🔑 Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/tanusree0/interactive-calendar.git
```

### 2️⃣ Navigate to Folder

```bash
cd interactive-calendar
```

### 3️⃣ Run Project

* Open `index.html` in browser

---

## 🔐 API Setup

1. Get API key from:
   👉 https://openweathermap.org/api

2. Replace in `script.js`:

```js
const apiKey = "YOUR_API_KEY";
```


## 🚀 Future Enhancements

* 🔔 Event reminders / notifications
* 🗂 Event categories (Work, Personal, Study)
* ☁ Cloud sync (Firebase / MongoDB)
* 🔐 User authentication (Login system)
* 📱 PWA support (installable app)
* 🖱 Drag & drop event scheduling

---

## 🧪 Challenges Faced

* Handling dynamic calendar rendering
* Managing date alignment correctly
* Designing responsive UI with animations
* Integrating API with dynamic UI updates

---

## 📚 Learnings

* DOM manipulation at scale
* Working with JavaScript Date API
* Async/Await and API handling
* LocalStorage data structuring
* UI/UX design principles

---

## 👩‍💻 Author

**Tanusree Roy**
🎓 B.Tech, NIT Agartala
💻 Aspiring Software Engineer

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🧠 Suggest improvements

---

## 📬 Contact

Feel free to connect for collaboration or opportunities!
