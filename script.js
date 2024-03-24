const inputEl = document.getElementById("input-todo")
const addBtn = document.getElementById("add-todo")
const listUl = document.getElementById("todo-ul");
const pendingTasks = document.getElementById("pending-tasks")
const clearAllBtn = document.getElementById("clear-btn")

let taskList = []

function addNewTask() {
    if (inputEl.value.trim() != "") {
        taskList.push({
            task: inputEl.value,
            finished: false
        })
    }
    inputEl.value = ""

    showTaskList()
}

function showTaskList() {

    let newLi = ""

    taskList.forEach((item, index) => {
        newLi = newLi +
            `
            <div class="task-container">
                <img src="./img/checked.png" alt="checked-image" class="finish-task" onclick="finishTask(${index})"/>
                <li class="task ${item.finished && "finished"}">           
                <p>${item.task}</p>           
                </li>
                <img src="./img/delete.png" alt="delete-image" class="delete-task" onclick="deleteTask(${index})"/>
            </div>
        `
    });

    listUl.innerHTML = newLi;

    localStorage.setItem("list", JSON.stringify(taskList))

    pendingTasks.textContent = taskList.length;

    if (taskList.length > 0) {
        clearAllBtn.hidden = false;
        clearAllBtn.classList.add("active-clear-btn")
    } else {
        clearAllBtn.classList.remove("active-clear-btn")
    }
}

function deleteTask(index) {
    taskList.splice(index, 1)
    if (taskList.length === 0) {
        clearAllBtn.hidden = true;
    }
    showTaskList()
}

function finishTask(index) {
    taskList[index].finished = !taskList[index].finished
    showTaskList()
}

function reloadTaskList() {
    const tasksFromLocaslStorage = localStorage.getItem("list")
    if (tasksFromLocaslStorage) {
        taskList = JSON.parse(tasksFromLocaslStorage)
    }
    showTaskList()
}

reloadTaskList()

addBtn.addEventListener("click", addNewTask)

clearAllBtn.onclick = () => {
    taskList = [];
    showTaskList();
    clearAllBtn.hidden = true;
}

inputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNewTask();
    }
});