function generateHtmlMainBoard() {
    return /*html*/`
        <div class="popup-a-to-b d-none" id="popup-a-to-b-board">
            <img src="../assets/img/task-to-board.svg" alt="">
        </div>
        <div class="board-popup-bg d-none" id="popup-add-task">
                <div class="board-popup" id="popup-add-task-content"></div>
        </div>
        <div class="board-popup-bg d-none" id="popup-add-task-div">
            <div class="addtask-popup" id="popup-add-task-content-div"></div>
        </div>
        <div class="board-popup-bg d-none" id="popup-add-task-edit">
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
                </div>
                <div class="mobile-mgr-boardcard">
                    <div class="board_div">
                        <h3>In progress</h3> <button class="adding_Button" onclick="openPopupAddTask('board-in-progress')">+</button>
                    </div>
                    <div class="card_Div" id="board-in-progress" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                </div>
                <div class="mobile-mgr-boardcard">
                    <div class="board_div">
                        <h3>Await Feedback</h3> <button class="adding_Button" onclick="openPopupAddTask('board-await-feedback')">+</button>
                    </div>
                    <div class="card_Div" id="board-await-feedback" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                </div>
                <div class="mobile-done-boardcard">
                    <div class="board_div">
                        <h3>Done</h3>
                    </div>
                    <div class="card_Div" id="board-done" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                </div>
            </div>
        </div>
    `;
}


async function openPopupAddTask(boardcard) {
    let popup = document.getElementById('popup-add-task');
    let content = document.getElementById('popup-add-task-content');

    popup.classList.remove('d-none');
    content.classList.remove('slide-out');
    content.classList.add('slide-in');
    content.innerHTML = /*html*/`
        <img class="close-popup" src="../assets/img/icons/Close.svg" alt="" onclick="closePopupAddTask(); return false">
        <div class="popup-box">
            <h2 class="h2-addtask-board">Add Task</h2>
            <div>
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
