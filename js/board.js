
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


<<<<<<< HEAD


=======
>>>>>>> 44ea90d5e4ebbab56200d5747407f29a08f85b83
async function loadToDo() {
    let todo = document.getElementById('board-to-do');
    todo.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
       
        todo.innerHTML += /*html*/`
           <div   draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${task, i})" class="progress_card" id="board-to-do-section-${i}">
                <div  class="progress_infocard">
                    <button class="" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                        <h1>${task.title}</h1>
                        <span class="recipe_span">${task.description}</span>
                    </div>
                </div>
                <div class="progress_image_Div">
<<<<<<< HEAD
                    <div  class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div id="progress-${i}" class="progress-bar" style="width:0%"></div>
=======
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 70%"></div>
>>>>>>> 44ea90d5e4ebbab56200d5747407f29a08f85b83
                    </div>
                    
                    <div> /${totalSubtask(i)} Subtasks</div>     
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
<<<<<<< HEAD


    }

}

  
=======
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


function openPopupAddTaskDiv(task, i) {
    let taskValue = task;
    let div = document.getElementById('popup-add-task-div');
    let content = document.getElementById('popup-add-task-content-div');
    div.classList.remove('d-none');
    content.innerHTML = '<img class="close-a-board" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupAddTaskDiv(); return false">';
    content.innerHTML += /*html*/`
        <div class="popup-text">
            <div class="user-popup-btn" id="category-bg-change-${i}">User Story</div>
            <h2 class="popup-title">Kochwelt Page</h2>
            <div class="overflow">Build start page with recipe recommendation.</div>
            <div class="popup-div-assign-date">
                <div class="popup-date">
                    <div class="">Due date:</div>
                    <div class="">10/05/2023</div>
                </div>
                <div class="popup-prio">
                    <div>Priority:</div>
                    <div class="popup-prio-section">
                        <div>Medium</div>
                        <img src="/assets/img/icons/prio-urgent.svg" alt="Prio" class="popup-prio-icon">
                    </div>
                </div>
            </div>
            <div>
                <div class="">Assigned To:</div>
                <div class="popup-assigned">
                    <img src="https://ui-avatars.com/api/?name=PM&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon">
                    <div>Piri M.</div>
                </div>

            </div>
            <div>
                <div class="">Subtasks</div>
                <div class="popup-subtask">
                    <img src="/assets/img/icons/selected.svg" alt="Select Icon">
                    <div>Subtasks</div>
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
}


function closePopupAddTaskDiv(i) {
    let div = document.getElementById('popup-add-task-div');
    div.classList.add('d-none');
}
>>>>>>> 44ea90d5e4ebbab56200d5747407f29a08f85b83
   


function allowDrop(ev) {
    ev.preventDefault();
}


function dragStart(ev) {
     console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.transform = "rotate(13deg)";
<<<<<<< HEAD
    // let progress=document.getElementById('progress')
    // progress.style.width= "50%";
}


=======
}
 
>>>>>>> 44ea90d5e4ebbab56200d5747407f29a08f85b83

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
<<<<<<< HEAD





=======
  
>>>>>>> 44ea90d5e4ebbab56200d5747407f29a08f85b83

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
    console.log(total);
    return total;
}


function calculateSubtask(value, total) {
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





<<<<<<< HEAD


=======
>>>>>>> 44ea90d5e4ebbab56200d5747407f29a08f85b83
function cancelButton() {
    let button = document.getElementById('clear-button');
    button.innerHTML = '';
    button.innerHTML = /*html*/`
        Cancel<img src="/assets/img/icons/close1.svg" alt="Clear" id="clear-button-img">
    `;
}