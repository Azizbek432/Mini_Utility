// ======= Todo List =======
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
}

function addTaskToDOM(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    addTaskToDOM(text);
    taskInput.value = "";
    saveTasks();
  }
});

clearAllBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  saveTasks();
});

loadTasks();

// ======= Pomodoro Timer =======
let timer = 25 * 60; // 25 min
let interval = null;
const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");

function updateTimerDisplay() {
  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

startStopBtn.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
    startStopBtn.textContent = "Start";
  } else {
    interval = setInterval(() => {
      if (timer > 0) {
        timer--;
        updateTimerDisplay();
      } else {
        clearInterval(interval);
        interval = null;
        startStopBtn.textContent = "Start";
        alert("Time is up!");
      }
    }, 1000);
    startStopBtn.textContent = "Pause";
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  timer = 25 * 60;
  updateTimerDisplay();
  startStopBtn.textContent = "Start";
});

updateTimerDisplay();

const tips = [
  "Coding tip: Always comment your code for your future self.",
  "Chess tip: Control the center squares to dominate the board.",
  "Music tip: Practice 20 minutes daily rather than 3 hours once a week.",
  "Motivation tip: Take small steps every day; consistency beats intensity.",
  "Life tip: Drink enough water daily and stay hydrated.",
  "Coding tip: Don't memorize code, understand the logic behind it.",
  "Chess tip: Don't bring your Queen out too early in the game.",
  "Music tip: Record your practice sessions to hear your progress.",
  "Motivation tip: Your only limit is your mind. Stay focused.",
  "Life tip: Get at least 7-8 hours of sleep to keep your brain sharp.",
  "Coding tip: Break large problems into smaller, manageable tasks.",
  "Chess tip: Always look for your opponent's threat before making a move.",
  "Motivation tip: Done is better than perfect. Just start!",
  "Life tip: Practice gratitude; it changes your perspective on everything.",
  "Coding tip: Google is your best friend, don't be afraid to use it.",
];
const motivationText = document.getElementById("motivationText");
const newMotivationBtn = document.getElementById("newMotivation");

function showMotivation() {
  const index = Math.floor(Math.random() * tips.length);
  motivationText.textContent = tips[index];
}

newMotivationBtn.addEventListener("click", showMotivation);
showMotivation();

// ======= Music Player Logic =======
const musicUpload = document.getElementById("musicUpload");
const customUploadBtn = document.getElementById("customUploadBtn");
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseMusic");
const trackName = document.getElementById("trackName");

customUploadBtn.addEventListener("click", () => {
  musicUpload.click();
});

musicUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    trackName.textContent = "Track: " + file.name;
    playPauseBtn.textContent = "Play Music";
  }
});

playPauseBtn.addEventListener("click", () => {
  if (!audioPlayer.src) {
    alert("Please upload a music file first!");
    return;
  }

  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause Music";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "Play Music";
  }
});
