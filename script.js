let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    timestamp: new Date().toLocaleString()
  };
  tasks.push(task);
  displayTasks();
  taskInput.value = "";
}

function displayTasks() {
  const pendingTasksDiv = document.getElementById("pendingTasks");
  const completedTasksDiv = document.getElementById("completedTasks");
  pendingTasksDiv.innerHTML = "";
  completedTasksDiv.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${task.id})">
      <span>${task.text}</span>
      <span>${task.timestamp}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    if (task.completed) {
      completedTasksDiv.appendChild(taskDiv);
    } else {
      pendingTasksDiv.appendChild(taskDiv);
    }
  });
}

function toggleTask(id) {
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

displayTasks();