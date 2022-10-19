//on app load, get all tasks from local storage
window.onload = renderTaskHtml(Array.from(JSON.parse(localStorage.getItem("taskArrayToDoStorage"))));
// console.log("task array to do storage: " + )
document.querySelector("#currentDate").innerHTML = new Date();

/* create an array to manage tasks */
let taskArray = [];
let taskArrayDoneTask = [];
let taskId = 0;
let toDoTaskStorage = []

/* check task trung */
function checkTaskTrung(taskArray, newTaskValue){
    let trungTask = false;
    for (let i = 0; i < taskArray.length; i++){
        if (taskArray[i].taskName === newTaskValue){
            alert("task nay da ton tai trong list!");
            trungTask = true;
        }
    }
    return trungTask;
}

/* check input bi empty */
function checkInputEmpty(newTaskValue){
    let inputEmpty = false;
    if (newTaskValue == ""){
        alert("Hay dien task vao o input!")
        inputEmpty = true;
    }
    return inputEmpty;
}

/* get input from input field */
const newTask = document.querySelector("#new-task"); 

/* handle onclick event to add new task */
const addButton = document.querySelector("#addNewTaskBtn");
addButton.onclick = function(){
    const newTaskValue = newTask.value;
    if (taskArray.length != 0){
        toDoTaskStorage = Array.from(JSON.parse(localStorage.getItem("taskArrayToDoStorage")));
        checkInputEmpty(newTaskValue);
        checkTaskTrung(toDoTaskStorage, newTaskValue);
        if (checkTaskTrung(toDoTaskStorage, newTaskValue) == false && checkInputEmpty(newTaskValue) == false){
            let newTaskItem = new Task();
            taskId++;
            newTaskItem.taskName = newTaskValue;
            newTaskItem.id = taskId;
            console.log("new task id is: " + newTaskItem.id);
            toDoTaskStorage.push(newTaskItem);
            localStorage.setItem("taskArrayToDoStorage", JSON.stringify(toDoTaskStorage));
            console.log("task array to do storage: " + JSON.parse(localStorage.getItem("taskArrayToDoStorage")));
            renderTaskHtml(toDoTaskStorage);
        }               
    } 

    
    else 
    {
        if (checkInputEmpty(newTaskValue) == false){
            let newTaskItem = new Task();
            taskId = 1;
            newTaskItem.taskName = newTaskValue;
            newTaskItem.id = taskId;
            taskArray.push(newTaskItem);
            localStorage.setItem("taskArrayToDoStorage", JSON.stringify(taskArray));
            renderTaskHtml(taskArray); 
        }       
    }
}           

/* function de render tasks moi add them */
function renderTaskHtml(array){
    let html ='';
    if (array == 0){
        document.querySelector(".displayTasks").innerHTML = html;
    } else {
        for (let i = 0; i < array.length; i++){
            let taskItem = array[i];
            html += `${taskItem.taskName}
            <button onclick="xoaTask('${taskItem.id}')">Xoa task</button>
            <button onclick="doneTaskDisplay('${taskItem.id}')">Done task</button>
            <br>`;
            document.querySelector(".displayTasks").innerHTML = html;
        }
    }
}

/* function de render task done */
function renderTaskDone(taskArrayDoneTaskStorage){
    console.log("task done array inside renderTaskDone function: " + taskArrayDoneTaskStorage)
    let html ='';
    if (taskArrayDoneTaskStorage == 0){
        document.querySelector(".done-tasks-item").innerHTML = html;
    } else {
        for (let i = 0; i < taskArrayDoneTaskStorage.length; i++){
            html += `${taskArrayDoneTaskStorage[i].taskName}
            <br>`;
            document.querySelector(".done-tasks-item").innerHTML = html;
        }
    }
}

/* function to display done tasks */
/* khong the lam kieu trong function renderTaskHtml chi tao xoaBtn
roi ra ngoai function do va select xoaBtn roi moi goi onclick no duoc,
vi se bi bao loi xoaBtn is null:
const xoaBtn = document.querySelector(".xoaBtn");
xoaBtn.onclick = doneTaskDisplay(newTask.value);
=> phai lam onclick inline giong nhu trong function renderTaskHtml(taskArray)
*/
function doneTaskDisplay(value){
    let indexOfDoneTask= -1;
    for (let i = 0; i < taskArray.length; i++){
        if (taskArray[i].id == value){
            indexOfDoneTask = i;
        }
    }
    let newTaskDone = new Task();
    newTaskDone.taskName = taskArray[indexOfDoneTask].taskName;
    newTaskDone.id = taskArray[indexOfDoneTask].id;
    taskArrayDoneTask.push(newTaskDone);
    taskArray.splice(indexOfDoneTask, 1);
    localStorage.setItem("taskArrayDoneTaskStorage", JSON.stringify(taskArrayDoneTask));
    let taskArrayDoneTaskStorage = Array.from(JSON.parse(localStorage.getItem("taskArrayDoneTaskStorage")));    
    renderTaskHtml(taskArrayToDoStorage);
    renderTaskDone(taskArrayDoneTaskStorage);
}

function xoaTask(value){
    toDoTaskStorage = Array.from(JSON.parse(localStorage.getItem("taskArrayToDoStorage")));
    console.log("task array inside xoaTask function: " + toDoTaskStorage);     
    for (let j = 0; j < toDoTaskStorage.length; j++){
        console.log("task array thu j: " + toDoTaskStorage[j].taskName);
        let taskDelete = new Task();
        taskDelete.id = toDoTaskStorage[j].id;
        if(taskDelete.id == value){         
            console.log("task delete thu j: " + taskDelete.taskName)
            toDoTaskStorage.splice(j, 1);
        }                 
    localStorage.setItem("taskArrayToDoStorage", JSON.stringify(toDoTaskStorage));
    renderTaskHtml(toDoTaskStorage);
    }
}

// function xoaTask(value){
//     for (let j = 0; j < taskArray.length; j++){
//         let taskDelete = taskArray[j];
//         if (taskDelete.taskName === value){
//             const biXoa = taskDelete;
//             console.log("bi xoa: " + biXoa.taskName);
//             taskArray.splice(j, 1);
//             for (let i = 0; i < taskArray.length; i++){
//                 console.log("task array item left: " + taskArray[i].taskName);
//             }
//         }              
//     }
//     localStorage.setItem("taskArrayToDoStorage", JSON.stringify(taskArray));
//     renderTaskHtml(taskArray);
// }

