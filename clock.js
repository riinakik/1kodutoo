// Kella klass
class Clock {
  constructor() {
    // Muutujate deklareerimine ja viidete määramine HTML elementidele
    this.hoursElement = document.getElementById("hours");
    this.minutesElement = document.getElementById("minutes");
    this.secondsElement = document.getElementById("seconds");
    this.dateElement = document.getElementById("date");
    this.weekdayElement = document.getElementById("weekday");
    this.container = document.getElementById("container");
    this.clockBox = document.getElementById("clock-box");
    this.fontButton = document.getElementById("corner-button");
    this.darkToggle = document.getElementById("dark-toggle");

    this.fontSize = 10;
    this.selectedTimezone =
      localStorage.getItem("selectedTimezone") || "Europe/Tallinn"; // Vaikimisi ajavöönd
    this.backgroundOn = true;
    this.colorIndex = 0;

    // Kuude nimed
    this.monthNames = [
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
    this.weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // ChatGPT prompt: "spacebariga tekib ja vahetub clock-boxi ümber hõõguv joon"
    this.glowColors = [
      "rgb(186, 134, 11)",
      "rgb(180, 40, 40)",
      "rgb(0, 128, 128)",
      "rgb(180, 180, 180)",
    ];

    // ChatGPT prompt: "tahan vahetada fonte klikkides \"corner-button\" nupul"
    this.fonts = [
      "'Bebas Neue', sans-serif",
      "'Orbitron', sans-serif",
      "'Rajdhani', sans-serif",
      "'Anton', sans-serif",
      "'Rubik Mono One', sans-serif",
    ];
    this.currentFontIndex = 0;

    this.init();
  }

  init() {
    // ChatGPT prompt: "lehe laadimisel loe eelmine timezone localStorage-ist"
    this.update();
    setInterval(() => this.update(), 1000);

    // ChatGPT prompt: "muuda fondi suurust nooltega ja koos sellega clock-boxi suurust"
    window.addEventListener("keydown", (e) => this.handleKeydown(e));

    // ChatGPT prompt: "tahan, et klikk taustapildil peidab selle ja muudab tausta mustaks\nklikk mustal taustal toob pildi tagasi"
    this.container.addEventListener("click", (e) => this.toggleBackground(e));

    // ChatGPT prompt: "klikk clock-boxil eemaldab hõõguva joone"
    this.clockBox.addEventListener("click", () => this.removeGlow());

    // ChatGPT prompt: "tahan vahetada fonte klikkides \"corner-button\" nupul"
    this.fontButton.addEventListener("click", () => this.changeFont());

    // Darkmode osa
    this.darkToggle.addEventListener("click", () =>
      document.body.classList.toggle("dark-mode")
    );

    // ChatGPT prompt: "tahan valida ajavööndi, klikkides sobival timezone-buttonil"
    document.querySelectorAll(".timezone-button").forEach((btn) => {
      btn.addEventListener("click", () => this.setTimezone(btn));
    });
  }

  // ChatGPT prompt: "Kella ja kuupäeva uuendamine"
  update() {
    const now = new Date();
    const options = {
      timeZone: this.selectedTimezone,
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
    const timeParts = {};
    parts.forEach((part) => {
      timeParts[part.type] = part.value;
    });

    const hour = timeParts.hour;
    const minute = timeParts.minute;
    const second = timeParts.second;
    const day = timeParts.day;
    const year = timeParts.year;

    const monthIndex = this.monthNames.findIndex(
      (name) => name.toLowerCase() === timeParts.month.toLowerCase()
    );
    const weekday = this.weekdayNames.find(
      (name) => name.toLowerCase() === timeParts.weekday.toLowerCase()
    );

    this.hoursElement.innerHTML = hour + ":";
    this.minutesElement.innerHTML = minute + ":";
    this.secondsElement.innerHTML = second;
    this.weekdayElement.innerHTML = weekday;
    this.dateElement.innerHTML =
      day + " " + this.monthNames[monthIndex] + " " + year;
  }

  // ChatGPT prompt: "muuda fondi suurust nooltega ja spacebariga hõõgumist"
  handleKeydown(e) {
    if (e.key === "ArrowUp") {
      this.setFontSize(this.fontSize + 1);
    } else if (e.key === "ArrowDown") {
      this.setFontSize(Math.max(5, this.fontSize - 1));
    } else if (e.code === "Space") {
      this.cycleGlow();
    }
  }

  // ChatGPT prompt: "muuda fondi suurust koos clock-boxi suuruse muutumisega"
  setFontSize(size) {
    this.fontSize = size;
    document.getElementById("time").style.fontSize = this.fontSize + "vw";
    document.getElementById("weekday").style.fontSize =
      this.fontSize * 0.3 + "vw";
    document.getElementById("date").style.fontSize =
      this.fontSize * 0.25 + "vw";
    this.clockBox.style.padding =
      this.fontSize * 0.2 + "vh " + this.fontSize * 0.4 + "vw";
  }

  // ChatGPT prompt: "tahan valida ajavööndi timezone-nuppudega"
  setTimezone(button) {
    this.selectedTimezone = button.getAttribute("data-tz");
    localStorage.setItem("selectedTimezone", this.selectedTimezone);
    this.update();

    document
      .querySelectorAll(".timezone-button")
      .forEach((el) => el.classList.remove("active"));
    button.classList.add("active");
  }

  // ChatGPT prompt: "klikk taustal peidab taustapildi ja näitab musta tausta"
  toggleBackground(e) {
    if (e.target.id !== "container") return;

    if (this.backgroundOn) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundImage = 'url("images/book1.jpg")';
      document.body.style.backgroundColor = "";
    }

    this.backgroundOn = !this.backgroundOn;
  }

  // ChatGPT prompt: "spacebariga tekib ja vahetub hõõguv joon"
  cycleGlow() {
    const color = this.glowColors[this.colorIndex];
    this.clockBox.style.border = "8px solid " + color;
    this.clockBox.style.setProperty("--glow-color", color);
    this.clockBox.style.animation = "glowPulse 2s infinite";
    this.colorIndex = (this.colorIndex + 1) % this.glowColors.length;
  }

  // ChatGPT prompt: "klikk clock-boxil eemaldab hõõgumise"
  removeGlow() {
    this.clockBox.style.border = "8px solid transparent";
    this.clockBox.style.animation = "none";
  }

  // ChatGPT prompt: "tahan fonte vahetada klikkides nupul"
  changeFont() {
    this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
    document.body.style.fontFamily = this.fonts[this.currentFontIndex];
  }
}

// ChatGPT prompt: "lehe laadimisel loe eelmine timezone localStorage-ist"
document.addEventListener("DOMContentLoaded", function () {
  new Clock();
});
