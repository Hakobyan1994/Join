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
}

function closePopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    popup.classList.add('d-none');
}

function renderAddTaskForPopup() {
    e.preventDefault();
    
}

async function loadToDo() {
    let window = document.getElementById('new-to-do');
    window.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        window.innerHTML += /*html*/`
            <div class="progress_card">
                <div class="progress_infocard">
                    <button class="tecnical_TaskButton" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                    <h1>${task.title}</h1>
                    <span class="recipe_span">${task.description}</span>
                </div>
            <div class="progress_image_Div">
                <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: 25%"></div>
                </div>
                <div>1/2 Subtasks</div>
            </div>
                
            <div class="Members_Div">
                <div>Assigned To Symbols</div>
                <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
            </div>
    `;
    }
}