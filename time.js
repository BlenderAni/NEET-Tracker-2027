// ===============================
// TIMER SYSTEM
// ===============================

let seconds = 0;

let timerInterval = null;

let running = false;

const timerDisplay = document.getElementById("timer");

const totalTimeDisplay = document.getElementById("totalTime");

let sessions = JSON.parse(localStorage.getItem("studySessions")) || [];

let totalSeconds = sessions.reduce((sum, session) => sum + session.seconds, 0);

function formatTime(time) {
  let hours = Math.floor(time / 3600);

  let minutes = Math.floor((time % 3600) / 60);

  let secs = time % 60;

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0")
  );
}

function updateTimer() {
  timerDisplay.textContent = formatTime(seconds);
}

function updateTotalTime() {
  let hours = Math.floor(totalSeconds / 3600);

  let minutes = Math.floor((totalSeconds % 3600) / 60);

  totalTimeDisplay.textContent = hours + "h " + minutes + "m";
}

document.getElementById("startTimer").onclick = function () {
  if (running) {
    return;
  }

  running = true;

  timerInterval = setInterval(function () {
    seconds++;

    updateTimer();
  }, 1000);
};

document.getElementById("stopTimer").onclick = function () {
  clearInterval(timerInterval);

  running = false;

  if (seconds > 0) {
    let today = new Date();

    let date =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    let session = {
      date: date,

      seconds: seconds,
    };

    sessions.push(session);

    localStorage.setItem("studySessions", JSON.stringify(sessions));

    totalSeconds = sessions.reduce(
      (sum, session) => sum + session.seconds,

      0,
    );

    updateTotalTime();
  }

  seconds = 0;

  updateTimer();

  renderCalendar();
};

document.getElementById("resetTimer").onclick = function () {
  clearInterval(timerInterval);

  running = false;

  seconds = 0;

  updateTimer();
};

updateTotalTime();

// ===============================
// STUDY CALENDAR SYSTEM
// ===============================

const studyDates = document.getElementById("studyDates");

const studyMonth = document.getElementById("studyMonth");

const prevMonth = document.getElementById("prevStudyMonth");

const nextMonth = document.getElementById("nextStudyMonth");

let calendarDate = new Date();

let studyData = {};

function calculateStudyHours(date) {
  let total = 0;

  sessions.forEach(function (session) {
    if (session.date === date) {
      total += session.seconds;
    }
  });

  return total / 3600;
}

function renderCalendar() {
  studyDates.innerHTML = "";

  let year = calendarDate.getFullYear();

  let month = calendarDate.getMonth();

  studyMonth.textContent =
    calendarDate.toLocaleString(
      "default",

      {
        month: "long",
      },
    ) +
    " " +
    year;

  let firstDay = new Date(year, month, 1).getDay();

  let totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    let empty = document.createElement("div");

    studyDates.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    let box = document.createElement("div");

    box.textContent = day;

    let key =
      year +
      "-" +
      String(month + 1).padStart(2, "0") +
      "-" +
      String(day).padStart(2, "0");

    let hours = calculateStudyHours(key);

    if (hours >= 10) {
      box.innerHTML = day + "<span class='study-mark'>🙂</span>";

      box.classList.add("great-study");
    } else if (hours >= 8) {
      box.innerHTML = day + "<span class='study-mark'>✓</span>";

      box.classList.add("good-study");
    }
    studyDates.appendChild(box);
  }
}

prevMonth.onclick = function () {
  calendarDate.setMonth(calendarDate.getMonth() - 1);

  renderCalendar();
};

nextMonth.onclick = function () {
  calendarDate.setMonth(calendarDate.getMonth() + 1);

  renderCalendar();
};

renderCalendar();
