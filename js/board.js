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
    let todo = document.getElementById('new-to-do');
    todo.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        todo.innerHTML += /*html*/`
            <div class="progress_card">
                <div class="progress_infocard">
                    <button class="" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                        <h1>${task.title}</h1>
                        <span class="recipe_span">${task.description}</span>
                    </div>
                </div>
                <div class="progress_image_Div">
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 100%"></div>
                    </div>
                    <div> /${totalSubtask(i)} Subtasks</div>     
                </div>
                <div class="Members_Div">
                    <div>Assigned To Symbols</div>
                    <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
                </div>
            </div>
        `;
        changeCategoryButton(i);
        // calculateSubtask(value, total);
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

// ${value}/${total}
