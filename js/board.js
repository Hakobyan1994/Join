
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
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
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
                        <div class="progress-bar" style="width: 70%"></div>
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


function openPopupAddTaskDiv(i) {
    let div = document.getElementById('popup-add-task-div');
    let content = document.getElementById('popup-add-task-content-div');
    div.classList.remove('d-none');
    content.innerHTML = '<img class="close-a-board" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupAddTaskDiv(); return false">';

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
            todo.style.display = '';
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