// Muutujate deklareerimine
let h, m, s, dateElement, weekdayElement;
let hourVal, minuteVal, secondVal, day, month, year;
let fontSize = 10;
let selectedTimezone = "Europe/Tallinn"; // Vaikimisi ajavöönd
let backgroundOn = true; // Taustapildi olek

// Viidete määramine HTML elementidele
h = document.getElementById("hours");
m = document.getElementById("minutes");
s = document.getElementById("seconds");
dateElement = document.getElementById("date");
weekdayElement = document.getElementById("weekday");

// Kuude nimed
let monthNames = [
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
  "December",
];

// Nädalapäevade nimed
let weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

// ChatGPT prompt: "lehe laadimisel loe eelmine timezone localStorage-ist"
document.addEventListener("DOMContentLoaded", function () {
  const storedTimezone = localStorage.getItem("selectedTimezone");
  if (storedTimezone) {
    selectedTimezone = storedTimezone;
  }
});

// Kell tiksub iga sekund
setInterval(updateClock, 1000);
updateClock();

// ChatGPT prompt: "muuda fondi suurust nooltega ja koos sellega clock-boxi suurust"
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

// ChatGPT prompt: "tahan, et klikk taustapildil peidab selle ja muudab tausta mustaks
// klikk mustal taustal toob pildi tagasi"
document.getElementById("container").addEventListener("click", function (e) {
  if (e.target.id === "container") {
    if (backgroundOn) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundImage = 'url("images/book1.jpg")';
      document.body.style.backgroundColor = "";
    }
    backgroundOn = !backgroundOn;
  }
});

// ChatGPT prompt: "spacebariga tekib ja vahetub clock-boxi ümber hõõguv joon"
let colorIndex = 0;
const glowColors = [
  "rgb(186, 134, 11)", 
  "rgb(180, 40, 40)",   
  "rgb(0, 128, 128)",   
  "rgb(180, 180, 180)"  
];

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    const box = document.getElementById("clock-box");
    const borderColor = glowColors[colorIndex];
    box.style.border = "8px solid " + borderColor;
    box.style.setProperty("--glow-color", borderColor);
    box.style.animation = "glowPulse 2s infinite";
    colorIndex = (colorIndex + 1) % glowColors.length;
  }
});

// ChatGPT prompt: " klikk clock-boxil eemaldab hõõguva joone"
document.getElementById("clock-box").addEventListener("click", function () {
  const box = document.getElementById("clock-box");
  box.style.border = "8px solid transparent";
  box.style.animation = "none";
});

// ChatGPT prompt: "tahan valida ajavööndi, klikkides sobival timezone-buttonil"
document.querySelectorAll(".timezone-button").forEach(function (element) {
  element.addEventListener("click", function () {
    selectedTimezone = this.getAttribute("data-tz");
    localStorage.setItem("selectedTimezone", selectedTimezone);
    updateClock();

    // Märgi aktiivne visuaalselt
    document.querySelectorAll(".timezone-button").forEach(function (el) {
      el.classList.remove("active");
    });
    this.classList.add("active");
  });
});

// ChatGPT prompt: "tahan vahetada fonte klikkides "corner-button" nupul"
const fonts = [
  "'Bebas Neue', sans-serif",
  "'Orbitron', sans-serif",
  "'Rajdhani', sans-serif",
  "'Anton', sans-serif",
  "'Rubik Mono One', sans-serif",
];

let currentFontIndex = 0;

document.getElementById("corner-button").addEventListener("click", function () {
  currentFontIndex = (currentFontIndex + 1) % fonts.length;
  const selectedFont = fonts[currentFontIndex];
  document.body.style.fontFamily = selectedFont;
});

// Darkmode osa
document.getElementById("dark-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
  
