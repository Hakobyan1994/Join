let selectedSubtasksCount = 0;
let progressArray=[]

function openPopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    let content = document.getElementById('popup-add-task-content');

    popup.classList.remove('d-none');
    content.innerHTML = /*html*/`
        <img class="close-popup" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupAddTask(); return false">
        <div class="popup-box">
            <h2>Add Task</h2>
            <div>
                <div class="main-box">
                    <div class="form">
                        ${generateHtmlAddTaskForm()}      
                    </div>
                    <div>
                        ${generateHtmlFormSection()}
                    </div>
                </div>  
            </div>  
        </div> 
    `;
    addEventFunctions();
    cancelButton();
}


function closePopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    popup.classList.add('d-none');
}


function renderAddTaskForPopup() {
    e.preventDefault();

}




async function loadToDo() {
    let todo = document.getElementById('board-to-do');
    todo.innerHTML = '';
    if (!tasks || tasks.length===0) {
        console.log(tasks.length);
       let NoTodotask=document.getElementById('NoToDo')
       NoTodotask.textContent='aaaaaa'
       NoTodotask.style.display='flex'
       todo.appendChild(NoTodotask)
       return;
        
    } 
      
    for (let i = 0; i < tasks.length; i++) {
        let task= tasks[i];
        
        todo.innerHTML += /*html*/`
           <div   draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}">
                <div  class="progress_infocard">
                    <button class="" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                        <h1>${task.title}</h1>
                        <span class="recipe_span">${task.description}</span>
                    </div>
                </div>
                <div class="progress_image_Div">
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" stygitle="width: 70%"></div>
                    </div>
                    
                    <div> ${updateSelectedSubtasksCount()} / ${totalSubtask(i)} Subtasks</div>     
                </div>
                <div class="Members_Div">
                    <div id="user-board-${i}"></div>
                    <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
                </div>
            </div> 
        `;
        changeCategoryButton(i);
        await createUserButtons(task, i);
        // calculateSubtask(value, total);


    }

}  
  


      


function createUserButtons(task, i) {
    let iconmember = document.getElementById(`user-board-${i}`);
    let letters = task.letter;
    for (let k = 0; k < letters.length; k++) {
        const letter = letters[k];
        iconmember.innerHTML += /*html*/`
        <img src="https://ui-avatars.com/api/?name=${letter}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon board-user-icon">
    `;
    }
}


async function openPopupAddTaskDiv(i) {
    let div = document.getElementById('popup-add-task-div');
    let content = document.getElementById('popup-add-task-content-div');
    div.classList.remove('d-none');
    let task = tasks[i];
    content.innerHTML = '<img class="close-a-board" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupAddTaskDiv(); return false">';
    content.innerHTML += /*html*/`
        <div class="popup-text">
            <div class="user-popup-btn" id="category-bg-change-${i}">${task.category}</div>
            <h2 class="popup-title">${task.title}</h2>
            <div class="overflow">${task.description}</div>
            <div class="popup-div-assign-date-title">
                <div>
                    <div class="popup-date">Due Date:</div>
                    <div>Priority:</div>
                </div>
                <div class="popup-div-assign-date-title-content">
                    <div class="popup-date">${task.date}</div>
                    <div class="popup-prio-section">
                        <div>${task.priority.toUpperCase()}</div>
                        <img src="/assets/img/icons/prio-${task.priority}.svg" alt="Prio" class="popup-prio-icon">
                    </div>
                </div>
            </div>
            <div>
                <div class="popup-assigned-div">Assigned To:</div>
                <div class="popup-assigned" id="popup-user-${i}">
                </div>

            </div>
            <div>
                <div class="">Subtasks</div>
                <div class="popup-subtask" id="popup-subtasks-${i}">
                </div>
            </div>
            <div class="popup-task-footer">
                <div class="popup-task-footer-section">
                    <img src="/assets/img/icons/trash.svg" alt="Trash Icon">
                    <div>Delete</div>
                </div>
                <p class="separator"></p>
                <div class="popup-task-footer-section">
                    <img src="/assets/img/icons/edit.svg" alt="Edit Icon">
                    <div>Edit</div>
                </div> 
            </div>

        </div>
    `;
    createUserToAssigned(i);
    createSubtasksToAddTaskPopup(i);
    // await calculateSubtask(i);
}


function createUserToAssigned(i) {
    let div = document.getElementById(`popup-user-${i}`);
    let task = tasks[i];
    for (let k = 0; k < task.letter.length; k++) {
        let letters = task.letter[k];
        let user = task.assigned[k];
        div.innerHTML += /*html*/`
            <div class="each-user-section">
                <img src="https://ui-avatars.com/api/?name=${letters}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon">
                <div>${user}</div>  
            </div>

        `;   
    }
}

function createSubtasksToAddTaskPopup(i) {
    let div = document.getElementById(`popup-subtasks-${i}`);
    let task = tasks[i];
    let k = null; 
    for (let k = 0; k < task.subtask.length; k++) {
        let subtasks = task.subtask[k];
        div.innerHTML += /*html*/`
            <div class="each-subtask-section">
                <div>
                    <img src="/assets/img/icons/none-selected.svg" alt="Select Icon" id="select-subtask-board-${k}" onclick="checkOffSubtask('${i}','${k}')">
                    <div id="each-subtasks-${k}" value="not-selected">${subtasks}</div>   
                </div>
            </div>
        `;
        
    }
}


async function checkOffSubtask(i, k) {
    let img = document.getElementById(`select-subtask-board-${k}`);
    let subtask = document.getElementById(`each-subtasks-${k}`);
    

    if (img.src.includes('none-selected.svg')) {
        img.src = '/assets/img/icons/selected.svg';
        img.alt = 'Selected';
        subtask.setAttribute('value', 'selected');
        selectedSubtasksCount++;
        pushSelectedSubtask(i, k);
    } else {
        img.src = '/assets/img/icons/none-selected.svg';
        img.alt = 'Not Selected';
        subtask.setAttribute('value', 'not-selected');
        selectedSubtasksCount--;
    }
    // updateSelectedSubtasksCount();
}


function pushSelectedSubtask(i, k) {
    let subtask = document.getElementById(`each-subtasks-${k}`);

    if(subtask) {
        let value = subtask.getAttribute('value');
        let taskArray = tasks[i];
        let subtaskArray = taskArray.subtask[k];
        let selectedTask = subtaskArray.selected;
        selectedTask = [];

        if(value === 'selected') {
            let response = subtask.textContent;
            selectedTask.push(response);
            console.log('Subtask:', response);
        }
    }   
}


function closePopupAddTaskDiv(i) {
    let div = document.getElementById('popup-add-task-div');
    div.classList.add('d-none');
}
    

function allowDrop(ev) {
    ev.preventDefault();
}


function dragStart(ev) {
     
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.transform = "rotate(13deg)";
    // let progress=document.getElementById('progress')
    // progress.style.width= "50%";
}



function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    // ev.target.appendChild(draggedElement);
    draggedElement.style.transform = "rotate(0deg)";
    
    if (!ev.target.contains(draggedElement)) {
        ev.target.appendChild(draggedElement);
    }
}


function changeCategoryButton(i) {
    let categoryBtn = document.getElementById(`category-bg-change-${i}`);

    if (categoryBtn.textContent === 'Technical Task') {
        categoryBtn.classList.add('tecnical_TaskButton');
    } else {
        categoryBtn.classList.add('user_Story_button');
    }
}


function totalSubtask(i) {
    let task = tasks[i];
    let total = task.subtask.length;
    // console.log(total);
    return total;
}


// function calculateSubtask(i) {
//     let div = document.getElementById(`popup-subtasks-${i}`);
//     let totalSelected = 0;

//     for (let k = 0; k < tasks[i].subtask.length; k++) {
//         let eachSubtask = document.getElementById(`select-subtask-board-${k}`)

//         if (eachSubtask.src.includes('selected')) {
//             totalSelected++;
//             console.log('Gesamtanzahl ausgewählter Unteraufgaben:', totalSelected);
//         }
//     }
    

// }

function updateSelectedSubtasksCount() {
    console.log('Anzahl', selectedSubtasksCount);
    return selectedSubtasksCount;
}


function returnValueOfSubtask() {

}


function searchTasks() {
    searchTaskToDo();
}

function searchTaskToDo() {
    let input = document.getElementById('input-search-task');
    let filter = input.value.toUpperCase();

    for (let i = 0; i < tasks.length; i++) {
        let todo = document.getElementById(`board-to-do-section-${i}`);
        let array = tasks[i];
        let description = array.description;
        let title = array.title;
        let name = title.toUpperCase();
        let subname = description.toUpperCase();
        if (name.indexOf(filter) > -1 || subname.indexOf(filter) > -1) {
            todo.style.display = 'block';
        } else {
            todo.style.display = 'none';
        }
    }

}


function cancelButton() {
    let button = document.getElementById('clear-button');
    button.innerHTML = '';
    button.innerHTML = /*html*/`
        Cancel<img src="/assets/img/icons/close1.svg" alt="Clear" id="clear-button-img">
    `;
}