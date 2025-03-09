let totalTasks = document.getElementById("total-tasks")
let pendingTasks = document.getElementById("pending-tasks")
let workingTasks = document.getElementById("working-tasks")
let completedTasks = document.getElementById("completed-tasks")
let overallCompletion = document.getElementById("overall-completion")
const addNewTaskBtn = document.getElementById("add-task-btn")
const mainContainer = document.getElementById("main-container")
const addNewTask = document.getElementById("add-new-task")
const addTask = document.getElementById("add-task")
const pendingTasksContainer = document.getElementById("pending-tasks-container")
const taskInput = document.getElementById("task-input")
const cancelBtn = document.getElementById("cancel-btn")


// Function to calculate the stats of tasks progress
function setTaskStats() {
    let pendingNum = document.querySelectorAll(".pending")
    let workinNum = document.querySelectorAll(".working")
    let completedNum = document.querySelectorAll(".completed")
    const allTask = document.querySelectorAll(".task")
    totalTasks.textContent = allTask.length > 9 ? allTask.length : `0${allTask.length}`
    workingTasks.textContent = workinNum.length > 9 ? workinNum.length : `0${workinNum.length}`
    workingTasks.style.width = `${(workinNum.length / allTask.length * 100).toFixed(2)}%`
    completedTasks.textContent = completedNum.length > 9 ? completedNum.length : `0${completedNum.length}`
    completedTasks.style.width = `${(completedNum.length / allTask.length * 100).toFixed(2)}%`
    overallCompletion.textContent = `${(completedNum.length / allTask.length * 100).toFixed(0)}%`

    if(pendingNum.length > 0){
        pendingTasks.textContent = pendingNum.length > 9 ? pendingNum.length : `0${pendingNum.length}`
        pendingTasks.style.width = `${(pendingNum.length / allTask.length * 100)}%`
        document.getElementById("pending-task-num").style.display = "none"
        
    } else{
        pendingTasks.textContent = ""
        pendingTasks.style.width = 0
        document.getElementById("pending-task-num").style.display = "block"
    }

    if(workinNum.length > 0){
        workingTasks.textContent = workinNum.length > 9 ? workinNum.length : `0${workinNum.length}`
        workingTasks.style.width = `${(workinNum.length / allTask.length * 100)}%`
        document.getElementById("working-task-num").style.display = "none"
        
    } else{
        workingTasks.textContent = ""
        workingTasks.style.width = 0
        document.getElementById("working-task-num").style.display = "block"
    }

    if(completedNum.length > 0){
        completedTasks.textContent = completedNum.length > 9 ? completedNum.length : `0${completedNum.length}`
        completedTasks.style.width = `${(completedNum.length / allTask.length * 100)}%`
        document.getElementById("completed-task-num").style.display = "none"
        
    } else{
        completedTasks.textContent = ""
        completedTasks.style.width = 0
        document.getElementById("completed-task-num").style.display = "block"
    }
    
}

// adding a new task
addNewTaskBtn.addEventListener("click", () => {
    mainContainer.classList.add("disabled")
    addNewTask.style.display = "block"
})


// add tasks after input
addTask.addEventListener("click", () => {
    if(taskInput.value) {
        mainContainer.classList.remove("disabled")
        addNewTask.style.display = "none"
        
        pendingTasksContainer.innerHTML += (`
            <div class="task" draggable="true">
                <div class="task-status-container">
                    <p class="status-title">PENDING</p>
                    <div class="pending">

                    </div>
                </div>
                <p class="task-description">${taskInput.value}</p>
            </div>
`)
    }   
        taskInput.value = ""
        render()
})


cancelBtn.addEventListener("click", () => {
    mainContainer.classList.remove("disabled")
    addNewTask.style.display = "none"
})


// function to enable dragging state to all tasks cards
function enableDragging() {
    const allTask = document.querySelectorAll(".task")
    allTask.forEach(task => {
        const taskId = uuid.v4()
        task.id = taskId
        task.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", task.id)
            task.classList.add("dragging")
        })
    
        task.addEventListener("dragend", e => {
            task.classList.remove("dragging")
        })
    })
}

// function to enable to catch the dropped task card and append to the board
function enableAddTasksOnDrop() {
    const allBoardContainers = document.querySelectorAll(".board-container")
    allBoardContainers.forEach(container => {
        container.addEventListener("dragover", e => {
            e.preventDefault()
            container.style.opacity = 0.5
        })
    
        container.addEventListener("dragleave", e => {
            e.preventDefault()
            container.style.opacity = 1
    
        })
    
        container.addEventListener("drop", e => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData("text/plain")
            const task = document.getElementById(taskId)
            const targetContainer = container.querySelector(".tasks-container")
            targetContainer.appendChild(task)
            container.style.opacity = 1
            container.style.boxShadow = "none"
            
            const setTaskStatus = task.querySelectorAll("div")
            const setTaskStatusTitle = task.querySelectorAll(".status-title") 
            
            setTaskStatus.forEach(task => {
                if(task.className != "task-status-container") {
                    task.className = container.id
                }
            })
    
            setTaskStatusTitle.forEach(task => {
                if(task.textContent != container.id){
                    task.textContent = container.id
                }
            })
            setTaskStats()
        })
        
    })
}

// change add button on small screen
// const moveElement = () => {
//     const originalParent = document.getElementById("pending")
//     const newParent = document.getElementById("header")

//     if (window.matchMedia("(max-width: 1280px)").matches) {
//         // Move element to the new container
//         if (!newParent.contains(addNewTaskBtn)) {
//             newParent.appendChild(addNewTaskBtn);
//         }
//     } else {
//         // Move it back to original place if screen is larger
//         if (!originalParent.contains(addNewTaskBtn)) {
//             originalParent.appendChild(addNewTaskBtn);
//         }
//     }
// }

// window.addEventListener("resize", moveElement)

// set of functions needs to be run after every new task added
function render() {
    enableDragging()
    enableAddTasksOnDrop()
    setTaskStats()
}


// Initial call to render
render()
// moveElement()