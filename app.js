const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const alarm = document.getElementById("alarm");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timerInterval = null;
let timeLeft = 25 * 60;

function loadTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.textContent = task;
    const deleteBtn = document.createElement("i");
    deleteBtn.className = "fa fa-trash-o delete-btn";
    deleteBtn.onclick = () => deleteTask(index);
    taskEl.appendChild(deleteBtn);
    taskList.appendChild(taskEl);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alarm.play();
      alert("Time is up!");
      timeLeft = 25 * 60;
      timer.textContent = "25:00";
    } else {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  }, 1000);
}

addTaskBtn.addEventListener("click", addTask);
startBtn.addEventListener("click", startTimer);
