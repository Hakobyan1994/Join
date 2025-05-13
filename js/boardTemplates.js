/**
 * Generates the HTML content for the main board.
 * @returns {string} The HTML content for the main board.
 */
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
                        <h2>Board</h2>
                        <button class="mobile-add-task-board" onclick="openPopupAddTask('board-to-do'); return false">+</button>
                    </div>

                    <form class="mobile-search-board">
                        <div class="no-results" id="no-results">No results found</div>
                        <div id="logged-info" style="color:red; display:none; font-size:12px" >you should be logged in</div>
                        <div class="input_button_Div">
                            <input class="input-searchfield" type="text" placeholder="Find Task" id="input-search-task" onkeyup="searchTasks()">
                            <button   id="add" class="add-task-btn"  onclick="openPopupAddTask('board-to-do'); return false">
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
                    <div class="card_Div" id="board-to-do" ondrop="drop(event)" ondragover="allowDrop(event)" ontouchend="onTouchEnd(event)" ontouchmove="onTouchMove(event)"></div>
                </div>
                <div class="mobile-mgr-boardcard">
                    <div class="board_div">
                        <h3>In progress</h3> <button class="adding_Button" onclick="openPopupAddTask('board-in-progress')">+</button>
                    </div>
                    <div class="card_Div" id="board-in-progress" ondrop="drop(event)" ondragover="allowDrop(event)" ontouchend="onTouchEnd(event)" ontouchmove="onTouchMove(event)"></div>

                </div>
                <div class="mobile-mgr-boardcard">
                    <div class="board_div">
                        <h3>Await Feedback</h3> <button class="adding_Button" onclick="openPopupAddTask('board-await-feedback')">+</button>
                    </div>
                    <div class="card_Div" id="board-await-feedback" ondrop="drop(event)" ondragover="allowDrop(event)" ontouchend="onTouchEnd(event)" ontouchmove="onTouchMove(event)"></div>

                </div>
                <div class="mobile-done-boardcard">
                    <div class="board_div">
                        <h3>Done</h3>
                    </div>
                    <div class="card_Div" id="board-done" ondrop="drop(event)" ondragover="allowDrop(event)" ontouchend="onTouchEnd(event)" ontouchmove="onTouchMove(event)"></div>
                    <div></div>
                </div>
            </div>
        </div>
    `;
}


/**
 * Opens the add task popup for a specific board card.
 * 
 * @param {string} boardcard - The type of board card to open the popup for.
 */
async function openPopupAddTask(boardcard) {
    if (authToken===null && asguest===null) {
        let loginInfo = document.getElementById('logged-info')
        loginInfo.style.display = 'flex'
        return
    } 
        let popup = document.getElementById('popup-add-task');
        let content = document.getElementById('popup-add-task-content');
        users = [];
        iniimg = [];
        subtasks = [];
        popup.style.display = 'flex';
        content.classList.remove('slide-out');
        content.classList.add('slide-in');
        content.innerHTML = /*html*/`
        <img class="close-popup" src="../assets/img/icons/Close.svg" alt="" onclick="closePopupAddTask(); return false">
        <div class="popup-box">
            <div class="mobile-board-popup-add-task">
                <h2 class="h2-addtask-board">Add Task</h2>
                <div class="main-box board-add-task-window">
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
        clearButtonImgChange();
    
}


/**
 * Opens the add task popup for a specific task.
 * 
 * @param {number} i - The index of the task to open the popup for.
 */
async function openPopupAddTaskDiv(i) {
    await loadTaskss();
    await getAllContacts();
    
    
    // await loadTasks();
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
            <div class="user-popup-btn c1" id="category-bg-change-${i}">${taskValue?.category}</div>
            <h2 class="popup-title">${taskValue?.title}</h2>
            <div class="overflow">${taskValue?.description}</div>
            <div class="popup-div-assign-date-title">
                <div>
                    <div class="popup-date">Due Date:</div>
                    <div>Priority:</div>
                </div>
                <div class="popup-div-assign-date-title-content">
                    <div class="popup-date">${taskValue?.date}</div>
                    <div class="popup-prio-section">
                        <div>${taskValue?.prio.charAt(0).toUpperCase() + taskValue?.prio.slice(1).toLowerCase()}</div>
                        <img src="../assets/img/icons/prio-${taskValue?.prio}.svg" alt="Prio" class="popup-prio-icon">
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


/**
 * Generates the HTML content for a board card.
 * 
 * @param {Object} task - The task object for the card.
 * @param {number} i - The index of the task.
 * @returns {string} The HTML content for the board card.
 */
function generateBoardCard(task, i) {
    return /*html*/`
        <div onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}" draggable="true" ondragstart="dragStart(event)" ondrop="return false;" ontouchstart="onTouchStart(event)">           
            <div  class="progress_infocard">
                <button class="c1" id="category-bg-change-${i}">${task?.category}</button>
                <div class="cooking_title_div">
                    <h1>${task?.title}</h1>
                    <span class="recipe_span">${task?.description}</span>
                </div>
            </div>
            <div class="progress_image_Div" id="progress-bar-div-${i}" >
                <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
                </div>                
                <div class="amount-subtasks" id="amount-subtasks-${i}">${calculatePercentageForProgressBar(i)} %</div>     
            </div>
            ${generateProgressDetails(i)}
            <div class="Members_Div">
                <div id="user-board-${i}"></div>
                <img src="../assets/img/icons/prio-${task?.prio}.svg" alt="" class="board-prio-icons">
            </div>
        </div> 
    `;
}


/**
 * Generates the HTML content for the progress details section of a board card.
 * 
 * @param {number} i - The index of the task.
 * @returns {string} The HTML content for the progress details section.
 */
function generateProgressDetails(i) {
    return /*html*/`
        <div class="progress-hover">
            ${updateSelectedSubtasksCount(i)} of ${totalSubtask(i)} subtasks finished
        </div>  
    `;
}


/**
 * Generates the HTML content for the editable add task popup.
 * 
 * @param {number} i - The index of the task being edited.
 * @returns {string} The HTML content for the editable add task popup.
 */
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
                <div class="ok-btn-edit-section">
                    <button class="ok-btn-edit create-task" onclick="saveEditedTask(${i})">OK <img src="../assets/img/icons/check1.svg" alt="Check Icon"></button>
                </div>
            </div>
    `;
}


/**
 * Generates the HTML content for a subtask item.
 * @param {number} i - The index of the subtask item.
 * @param {string} text - The text content of the subtask item.
 * @returns {string} The HTML content for the subtask item.
 */
function getSubtasks() {
    let list = document.getElementById('subtasks');
    let taskValue = tasks[i];
    console.log(taskValue)
    list.innerHTML = '';
    if (!Array.isArray(taskValue.subtasks) || taskValue.subtasks.length === 0) {
        return;
    }
    for (const subtask of taskValue.subtasks) {
        console.log(subtask)
        // const text = subtask;
        list.innerHTML += /*html*/`
        <li class="each-subtask" id="each-subtask${i}">
            <div class="each-subtask-p" id="subtask${i}"><p class="subtask-p"></p>${subtask}</div>
            <div class="subtask-right">
                <img src="../assets/img/icons/edit.svg" alt="Edit" onclick="editSubtask(${i})">
                <p class="separator"></p>
                <img src="../assets/img/icons/trash.svg" alt="Edit" onclick="deleteSubtask(${i})">
            </div>
        </li>
    `;
    }
}


/**
 * Creates user avatars and names for the assigned section of the popup.
 * 
 * @param {number} i - The index of the task.
 */
// let useryyy
function createUserToAssigned(i) {
    let div = document.getElementById(`popup-user-${i}`);
    let taskValue = tasks[i];
    if (!Array.isArray(taskValue.assignedTo) || taskValue.assignedTo.length === 0) {
        return;
    }
    for (const user of taskValue.assignedTo) {
        const name = user.name || "";
        div.innerHTML += /*html*/`
        <div class="each-user-section">
            <img src="https://ui-avatars.com/api/?name=${name}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon">
            <div>${name}</div>  
        </div>
    `;
    }
}