function generateHtmlMainBoard() {
    return /*html*/`
        <div class="popup-a-to-b d-none" id="popup-a-to-b-board">
            <img src="../assets/img/task-to-board.svg" alt="">
        </div>
        <div class="board-popup-bg" id="popup-add-task">
                <div class="board-popup" id="popup-add-task-content"></div>
        </div>
        <div class="board-popup-bg" id="popup-add-task-div">
            <div class="addtask-popup" id="popup-add-task-content-div"></div>
        </div>
        <div class="board-popup-bg" id="popup-add-task-edit">
            <div class="addtask-popup popup-edit" id="popup-add-task-content-edit"></div>
        </div>
        <div class="main-window board-window">
            <div class="main_div">
                <div class="info_Div">
                    <div class="mobile-board-header">
                        <h1>Board</h1>
                        <button class="mobile-add-task-board" onclick="openPopupAddTask('board-to-do'); return false">+</button>
                    </div>

                    <form class="mobile-search-board">
                        <div class="input_button_Div">
                            <input class="input-searchfield" type="text" placeholder="Find Task" id="input-search-task" onkeyup="searchTasks()">
                            <button class="add-task-btn" onclick="openPopupAddTask('board-to-do'); return false">
                                <img src="../assets/img/icons/addi.png" alt="">
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
                <div class="adding_div">
                </div>
            </div>
            <div class="card_mainContainer">
                <div class="mobile-boardcard mobile-mgr-boardcard">
                    <div class="board_div">
                        <h3>To do</h3> <button class="adding_Button" onclick="openPopupAddTask('board-to-do')">+</button>
                       
                    </div>
                    <div class="card_Div" id="board-to-do" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                    <div  id='testt'>grgr</div>
                </div>
                <div class="mobile-mgr-boardcard">
                    <div class="board_div">
                        <h3>In progress</h3> <button class="adding_Button" onclick="openPopupAddTask('board-in-progress')">+</button>
                        <div></div>
                    </div>
                    <div class="card_Div" id="board-in-progress" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

                </div>
                <div class="mobile-mgr-boardcard">
                    <div class="board_div">
                        <h3>Await Feedback</h3> <button class="adding_Button" onclick="openPopupAddTask('board-await-feedback')">+</button>
                        <div></div>
                    </div>
                    <div class="card_Div" id="board-await-feedback" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

                </div>
                <div class="mobile-done-boardcard">
                    <div class="board_div">
                        <h3>Done</h3>
                    </div>
                    <div class="card_Div" id="board-done" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                    <div></div>
                </div>
            </div>
        </div>
    `;
}


async function openPopupAddTask(boardcard) {
    let popup = document.getElementById('popup-add-task');
    let content = document.getElementById('popup-add-task-content');

    popup.style.display = 'flex';
    content.classList.remove('slide-out');
    content.classList.add('slide-in');
    content.innerHTML = /*html*/`
        <img class="close-popup" src="../assets/img/icons/Close.svg" alt="" onclick="closePopupAddTask(); return false">
        <div class="popup-box">
            <h2 class="h2-addtask-board">Add Task</h2>
            <div class="mobile-board-popup-add-task">
                <div class="main-box">
                    <div class="form popup-addtask-main">
                        ${generateHtmlAddTaskForm()}      
                    </div>
                    <div class="popup-addtask-form">
                        ${generateHtmlFormSection(`${boardcard}`)}
                    </div>
                </div>  
            </div>  
        </div> 

    `;
    let assignedButton = document.getElementById('assigned-button');
    assignedButton.classList.add('assigned-button-b-pos');
    addEventFunctions();
    cancelButton();
    document.getElementById('date').min = minDate();
    document.getElementById('date').value = minDate();
}


async function openPopupAddTaskDiv(i) {
    let div = document.getElementById('popup-add-task-div');
    let content = document.getElementById('popup-add-task-content-div');
    div.style.display = 'flex';
    content.classList.remove('slide-out');
    content.classList.add('slide-in');
    let taskValue = tasks[i];
    content.innerHTML = /*html*/`
        <img class="close-a-board" src="../assets/img/icons/Close.svg" alt="" onclick="closePopupAddTaskDiv(${i}); return false">
        `;
    content.innerHTML += /*html*/`
        <div class="popup-text">
            <div class="user-popup-btn c1" id="category-bg-change-${i}">${taskValue.category}</div>
            <h2 class="popup-title">${taskValue.title}</h2>
            <div class="overflow">${taskValue.description}</div>
            <div class="popup-div-assign-date-title">
                <div>
                    <div class="popup-date">Due Date:</div>
                    <div>Priority:</div>
                </div>
                <div class="popup-div-assign-date-title-content">
                    <div class="popup-date">${taskValue.date}</div>
                    <div class="popup-prio-section">
                        <div>${taskValue.priority.charAt(0).toUpperCase() + taskValue.priority.slice(1).toLowerCase()}</div>
                        <img src="../assets/img/icons/prio-${taskValue.priority}.svg" alt="Prio" class="popup-prio-icon">
                    </div>
                </div>
            </div>
            <div>
                <div class="popup-assigned-div">Assigned To:</div>
                <div class="popup-assigned" id="popup-user-${i}">
                </div>

            </div>
            <div>
                <div class="mobile-subtask-board">Subtasks</div>
                <div class="popup-subtask" id="popup-subtasks-${i}">
                </div>
            </div>
            <div class="popup-task-footer">
                <div class="popup-task-footer-section" onclick="deleteTask(${i})">
                    <img src="../assets/img/icons/trash.svg" alt="Trash Icon">
                    <div>Delete</div>
                </div>
                <p class="separator"></p>
                <div class="popup-task-footer-section" onclick="editTask(${i})">
                    <img src="../assets/img/icons/edit.svg" alt="Edit Icon">
                    <div>Edit</div>
                </div> 
            </div>

        </div>
    `;

    createUserToAssigned(i);
    createSubtasksToAddTaskPopup(i);
    checkSelectedSubtasks(i);
    checkCategoryButton();
}


function generateBoardCard(task, i) {
    return /*html*/`
    <div   draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}">
        <div  class="progress_infocard">
            <button class="c1" id="category-bg-change-${i}">${task.category}</button>
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
            <img src="../assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
        </div>
    </div>      
    `;
}


function generateEditableAddtask(i) {
    return /*html*/`
            <div class="edit-div">
                <div class="edit-addtask">
                    ${generateHtmlTitle()}  
                    ${generateHtmlDescription()}  
                    ${generateHtmlDate()}  
                    ${generateHtmlPrio()}
                    ${generateHtmlAssigned()}
                    ${generateHtmlSubtasks()}
                </div>
                <button class="ok-btn-edit create-task" onclick="saveEditedTask(${i})">OK <img src="../assets/img/icons/check1.svg" alt="Check Icon"></button>
            </div>       

    `;
}


function getSubtasks() {
    let list = document.getElementById('subtasks');
    list.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += /*html*/`
        <li class="each-subtask" id="each-subtask${i}">
            <div class="each-subtask-p" id="subtask${i}"><p class="subtask-p"></p>${text}</div>
            <div class="subtask-right">
                <img src="../assets/img/icons/edit.svg" alt="Edit" onclick="editSubtask(${i})">
                <p class="separator"></p>
                <img src="../assets/img/icons/trash.svg" alt="Edit" onclick="deleteSubtask(${i})">
            </div>
        </li>
    `;
    }
}


function createUserToAssigned(i) {
    let div = document.getElementById(`popup-user-${i}`);
    let taskValue = tasks[i];
    for (let k = 0; k < taskValue.letter.length; k++) {
        let letters = taskValue.letter[k];
        let user = taskValue.assigned[k];
        div.innerHTML += /*html*/`
            <div class="each-user-section">
                <img src="https://ui-avatars.com/api/?name=${letters}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon">
                <div>${user}</div>  
            </div>
        `;
    }
}