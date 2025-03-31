// Muutujate deklareerimine
let h, m, s, dateElement, weekdayElement, timezoneElement;
let hourVal, minuteVal, secondVal, day, month, year;
let r, g, b;
let fontSize = 10;
let selectedTimezone = "Europe/Tallinn"; // Vaikimisi ajavöönd
let backgroundOn = true; // Taustapildi olek

// Viidete määramine HTML elementidele
h = document.getElementById("hours");
m = document.getElementById("minutes");
s = document.getElementById("seconds");
dateElement = document.getElementById("date");
weekdayElement = document.getElementById("weekday");
timezoneElement = document.getElementById("timezone");

// Kuude nimed
let monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Nädalapäevade nimed
let weekdayNames = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

// 📌 ChatGPT prompt: "tahan, et tekst värv muutuks järjest punane roheline sinine must"
let colorIndex = 0;
const colors = ["red", "green", "blue", "black"];

// 📌 ChatGPT prompt: "tahan, et teksti värv muutuks klaviatuuri vajutamisel ja kuupäeval klikkides"
function changeColor() {
  const chosenColor = colors[colorIndex];
  document.getElementById("clock-box").style.color = chosenColor;
  colorIndex = (colorIndex + 1) % colors.length;
}

window.addEventListener("keypress", changeColor);
dateElement.addEventListener("click", changeColor);

// Kella ja kuupäeva uuendamine
function updateClock() {
  const now = new Date();

  const options = {
    timeZone: selectedTimezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const parts = formatter.formatToParts(now);

  let timeParts = {};
  parts.forEach(function (part) {
    timeParts[part.type] = part.value;
  });

  hourVal = timeParts.hour;
  minuteVal = timeParts.minute;
  secondVal = timeParts.second;
  day = timeParts.day;
  year = timeParts.year;

  // Leia kuu indeks
  month = monthNames.findIndex(function (name) {
    return name.toLowerCase() === timeParts.month.toLowerCase();
  });

  // Leia nädalapäev
  const weekday = weekdayNames.find(function (name) {
    return name.toLowerCase() === timeParts.weekday.toLowerCase();
  });

  // Kuvatakse kell ja kuupäev HTML-is
  h.innerHTML = hourVal + ":";
  m.innerHTML = minuteVal + ":";
  s.innerHTML = secondVal;
  weekdayElement.innerHTML = weekday;
  dateElement.innerHTML = day + " " + monthNames[month] + " " + year;
}

// Timezone muutmine ja salvestamine
document
  .getElementById("timezone-select")
  .addEventListener("change", function (e) {
    selectedTimezone = e.target.value;
    localStorage.setItem("selectedTimezone", selectedTimezone);
    updateClock(); // uuendab kohe
  });

// Laadimisel loe eelmine timezone localStorage-ist
document.addEventListener("DOMContentLoaded", function () {
  const storedTimezone = localStorage.getItem("selectedTimezone");
  if (storedTimezone) {
    selectedTimezone = storedTimezone;
    document.getElementById("timezone-select").value = storedTimezone;
  } else {
    document.getElementById("timezone-select").value = selectedTimezone;
  }
});

// Kell tiksub iga sekund
setInterval(updateClock, 1000);
updateClock();

// 📌 ChatGPT prompt: "kuidas muuta fondi suurust nooltega ja koos sellega ovaali suurust"
window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") {
    fontSize += 1;
  } else if (e.key === "ArrowDown") {
    fontSize = Math.max(5, fontSize - 1);
  }

  document.getElementById("time").style.fontSize = fontSize + "vw";
  document.getElementById("weekday").style.fontSize = fontSize * 0.3 + "vw";
  document.getElementById("date").style.fontSize = fontSize * 0.25 + "vw";

  // Muuda ovaali paddingut vastavalt fondi suurusele
  document.getElementById("clock-box").style.padding =
    fontSize * 0.2 + "vh " + fontSize * 0.4 + "vw";
});

// 📌 ChatGPT prompt: "tahan, et taustapilt kaoks kui klikin taustal ja tuleks tagasi uuesti klikates"
document.getElementById("container").addEventListener("click", function (e) {
  if (e.target.id === "container") {
    if (backgroundOn) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundImage = 'url("images/comicbook.jpg")';
      document.body.style.backgroundColor = "";
    }
    backgroundOn = !backgroundOn;
  }
});

// 📌 ChatGPT prompt: "tahan et select timezone avaneks ja sulguks kui vajutan peale"
document
  .getElementById("timezone-toggle")
  .addEventListener("click", function () {
    document.querySelector(".custom-dropdown").classList.toggle("active");
  });

// 📌 ChatGPT prompt: "tahan et dropdown sulguks ka kui valin sama timezone mis oli juba valitud"
document
  .getElementById("timezone-select")
  .addEventListener("change", function () {
    document.querySelector(".custom-dropdown").classList.remove("active");
  });

document
  .getElementById("timezone-select")
  .addEventListener("blur", function () {
    document.querySelector(".custom-dropdown").classList.remove("active");
  });

// 📌 ChatGPT prompt: "tahan, et kui klikkan clock-boxi peale, siis ilmuks värviline hõõguv joon"
document.getElementById("clock-box").addEventListener("click", function () {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const borderColor = "rgb(" + r + "," + g + "," + b + ")";

  const box = document.getElementById("clock-box");

  // Lisa äärise värv ja sära
  box.style.border = "8px solid " + borderColor;
  box.style.setProperty("--glow-color", borderColor);
  box.style.animation = "glowPulse 2s infinite";
});

