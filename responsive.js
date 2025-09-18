/* ====== OPEN FEATURES ====== */
function openFeatures() {
  var elem = document.querySelectorAll(".elem")
  var fullElem = document.querySelectorAll(".fullElem")
  var fullelemback = document.querySelectorAll(".fullElem .back")

  elem.forEach(function(e){
    e.addEventListener("click", function(){
      // pehle sab band karo
      fullElem.forEach(f => f.classList.remove("active"))
      // jispe click hua sirf usko open karo
      fullElem[e.id].classList.add("active")
    })
  })

  fullelemback.forEach(function(back){
    back.addEventListener("click", function(){
      fullElem[back.id].classList.remove("active")
    })
  })
}
openFeatures()


/* ====== TODO LIST ====== */
function todoList() {
  var currentTask = [];
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  }

  function renderTask() {
    var allTask = document.querySelector(".allTask");
    let sum = "";
    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
                <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
                <button id=${idx}>Mark As Completed</button>
              </div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let input = document.querySelector(".addTask form #task-input");
  let textarea = document.querySelector(".addTask form textarea");
  let checkbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: input.value,
      details: textarea.value,
      imp: checkbox.checked,
    });
    renderTask();
    checkbox.checked = false;
    input.value = "";
    textarea.value = "";
  });
}
todoList();

/* ====== DAILY PLANNER ====== */
function dailyPlanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var dayPlanner = document.querySelector(".day-planner");

  var hours = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`);

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";
    wholeDaySum += `<div class="day-planner-time">
                      <p>${elem}</p>
                      <input id=${idx} type="text" placeholder="..." value="${savedData}">
                    </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

/* ====== POMODORO TIMER ====== */
function pomodorotimer() {
  let timer = document.querySelector(".Pomo-timer h1");
  var startBtn = document.querySelector(".Pomo-timer .start-timer");
  var PauseBtn = document.querySelector(".Pomo-timer .Pause-timer");
  var ResetBtn = document.querySelector(".Pomo-timer .Reset-timer");
  var session = document.querySelector(".pomodoro-fullpage .session");
  var isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timerInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "blue";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "green";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }
  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function ResetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  PauseBtn.addEventListener("click", pauseTimer);
  ResetBtn.addEventListener("click", ResetTimer);
}
pomodorotimer();

/* ====== DAILY GOALS ====== */
function dailyGoals() {
  let goals = [];
  if (localStorage.getItem("dailyGoals")) {
    goals = JSON.parse(localStorage.getItem("dailyGoals"));
  }

  const renderGoals = () => {
    const list = document.querySelector(".goal-list");
    let output = "";
    goals.forEach((g, i) => {
      output += `<div class="goal">
                  <div>
                    <h3>${g.text}</h3>
                    ${g.deadline ? `<small>⏳ Deadline: ${g.deadline}</small>` : ""}
                  </div>
                  <button data-id="${i}">Done</button>
                </div>`;
    });
    list.innerHTML = output;
    localStorage.setItem("dailyGoals", JSON.stringify(goals));
    document.querySelectorAll(".goal button").forEach((btn) => {
      btn.addEventListener("click", () => {
        goals.splice(btn.dataset.id, 1);
        renderGoals();
      });
    });
  };

  renderGoals();
  const form = document.querySelector(".goal-input form");
  const input = document.querySelector("#goal-input");
  const deadline = document.querySelector("#goal-deadline");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim() === "") return;
    goals.push({ text: input.value, deadline: deadline.value });
    input.value = "";
    deadline.value = "";
    renderGoals();
  });
}
dailyGoals();

/* ====== WEATHER + DATE ====== */
function weather() {
  var apiKey = "fc2153f650d2456fa7c185200250409";
  var city = "Indore";

  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var header2Temp = document.querySelector(".header2 h2");
  var header2Condition = document.querySelector(".header2 h4");
  var Precipitation = document.querySelector(".header2 .Precipitation");
  var Humidity = document.querySelector(".header2 .Humidity");
  var Wind = document.querySelector(".header2 .Wind");

  async function weatherAPICall() {
    var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    var data = await response.json();
    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`;
    Wind.innerHTML = `Wind: ${data.current.wind_kph}km/h`;
    Humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    Precipitation.innerHTML = `Precipitation: ${data.current.precip_mm}%`;
  }
  weatherAPICall();

  function timeDate() {
    const totalDaysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month}, ${year}`;
    if (hours > 12) {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}pm`;
    } else {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}am`;
    }
  }
  setInterval(() => {
    timeDate();
  }, 1000);
}
weather();

/* ====== THEME SWITCH ====== */
function theme() {
  var theme = document.querySelector(".theme");
  var rootElement = document.documentElement;
  var flag = 0;
  theme.addEventListener("click", function () {
    if (flag == 0) {
      rootElement.style.setProperty("--pri", "#EDDFB3");
      rootElement.style.setProperty("--sec", "#B09B71");
      rootElement.style.setProperty("--tri1", "#B09B71");
      rootElement.style.setProperty("--tri2", "#B09B71");
      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--pri", "#828181ff");
      rootElement.style.setProperty("--sec", "#494949");
      rootElement.style.setProperty("--tri1", "#494949");
      rootElement.style.setProperty("--tri2", "#494949");
      flag = 2;
    } else if (flag == 2) {
      rootElement.style.setProperty("--pri", "#0C0C0C");
      rootElement.style.setProperty("--sec", "#4a3834ff");
      rootElement.style.setProperty("--tri1", "#4a3834ff");
      rootElement.style.setProperty("--tri2", "#4a3834ff");
      flag = 0;
    }
  });
}
theme();
