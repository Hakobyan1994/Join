 let progressArray=[];
 let feedbackArray=[];
 let doneArray=[];
 let dataTask = [];



async function openPopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    let content = document.getElementById('popup-add-task-content');

    popup.classList.remove('d-none');
    content.classList.remove('slide-out');
    content.classList.add('slide-in');
    content.innerHTML = /*html*/`
        <img class="close-popup" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupAddTask(); return false">
        <div class="popup-box">
            <h2 class="h2-addtask-board">Add Task</h2>
            <div>
                <div class="main-box">
                    <div class="form popup-addtask-main">
                        ${generateHtmlAddTaskForm()}      
                    </div>
                    <div class="popup-addtask-form">
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
    let content = document.getElementById('popup-add-task-content');
    popup.classList.add('d-none');
    content.classList.remove('slide-in');
    content.classList.add('slide-out');

}


function renderAddTaskForPopup() {
    e.preventDefault();

}

function notData(params) {
    console.log(tasks);
    if(tasks.length===0) {
        console.log(tasks.length);
       let noTodotask=document.getElementById('NoToDo')
       noTodotask.style.display='flex'
       todo.appendChild(noTodotask)
       return;
    } 
}



async function loadToDo() {
    let todo = document.getElementById('board-to-do');
    todo.innerHTML = '';
    // console.log(tasks.length);
    test()
   
      
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
                        <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
                    </div>
                    
                    <div class="amount-subtasks" id="amount-subtasks-${i}">${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks</div>     
                </div>
                <div class="Members_Div">
                    <div id="user-board-${i}"></div>
                    <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
                </div>
            </div> 
        `;
        changeCategoryButton(i);
        await createUserButtons(task, i);
        await updateProgressBar(i);
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
    content.classList.remove('slide-out');
    content.classList.add('slide-in');
    let task = tasks[i];
    content.innerHTML = `<img class="close-a-board" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupAddTaskDiv(${i}); return false">`;
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
    checkSelectedSubtasks(i);
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
    checkSelectedSubtasks(i);
}

function checkSelectedSubtasks(i) {
    let task = tasks[i];

    for (let k = 0; k < task.subtask.length; k++) {
        let img = document.getElementById(`select-subtask-board-${k}`);
        let subtask = document.getElementById(`each-subtasks-${k}`);

        if (task.checkoffs.includes(k.toString())) {
            img.src = '/assets/img/icons/selected.svg';
            img.alt = 'Selected';
            subtask.setAttribute('value', 'selected');
        } else {
            img.src = '/assets/img/icons/none-selected.svg';
            img.alt = 'Not Selected';
            subtask.setAttribute('value', 'not-selected');
        }
    }
}


async function checkOffSubtask(i, k) {
    let img = document.getElementById(`select-subtask-board-${k}`);
    let subtask = document.getElementById(`each-subtasks-${k}`);
    


    if (img.src.includes('none-selected.svg')) {
        img.src = '/assets/img/icons/selected.svg';
        img.alt = 'Selected';
        subtask.setAttribute('value', 'selected');
        pushSelectedSubtask(i, k);
    } else {
        img.src = '/assets/img/icons/none-selected.svg';
        img.alt = 'Not Selected';
        subtask.setAttribute('value', 'not-selected');
        pushSelectedSubtask(i, k);
    }
    await loadTasks();
    pushSelectedSubtask(i, k);
    updateSelectedSubtasksCount(i);
}


async function pushSelectedSubtask(i, k) {
    await loadTasks();

    let subtask = document.getElementById(`each-subtasks-${k}`);
    let task = tasks[i];

    if (subtask && task) {
        let value = subtask.getAttribute('value');

        if (!Array.isArray(task.checkoffs)) {
            task.checkoffs = [];
        }

        if (value === 'selected') {
            if (!task.checkoffs.includes(k)) {
                task.checkoffs.push(k);
                await setItem('testaufgaben', JSON.stringify(tasks));
            }
        } else {
            let index = task.checkoffs.indexOf(k);
            if (index !== -1) {
                task.checkoffs.splice(index, 1);
                await setItem('testaufgaben', JSON.stringify(tasks));
            }
        }
    }
}


function closePopupAddTaskDiv(i) {
    let content = document.getElementById('popup-add-task-content-div');
    let div = document.getElementById('popup-add-task-div');
    let amount = document.getElementById(`amount-subtasks-${i}`);
    div.classList.add('d-none');
    content.classList.remove('slide-in');
    content.classList.add('slide-out');
    amount.innerHTML = /*html*/`
        ${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks
    `;
    calculatePercentageForProgressBar(i);
    updateProgressBar(i);
}

function calculatePercentageForProgressBar(i) {
    let total = totalSubtask(i);
    let subtotal = updateSelectedSubtasksCount(i);
    let percentage = (subtotal * 100) / total;
    return percentage;
}


function updateProgressBar(i) {
    let div = document.getElementById(`progress-bar-${i}`);
    div.style.width = calculatePercentageForProgressBar(i) + '%';
}
    

function allowDrop(ev) {
    ev.preventDefault();
}


function dragStart(ev) {
    let txt = ev.srcElement.id
   let id = txt[txt.length-1]
   tasks.splice(id, 1)
   console.log(id, 66);
   notData()
   dataTask.splice(id, 1)
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
    return total;
}


function updateSelectedSubtasksCount(i) {
    let selectedSubtasks = tasks[i].checkoffs.length;
    return selectedSubtasks;
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