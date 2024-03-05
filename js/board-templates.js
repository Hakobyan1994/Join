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
        <div class="main_div">
            <div class="info_Div">
                <h1>Board</h1>
                <form>
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
                <div class="board_div">
                    <h3>To do</h3> <button class="adding_Button" onclick="openPopupAddTask('board-to-do')">+</button>

                </div>
                <div class="board_div">
                    <h3>In progress</h3> <button class="adding_Button" onclick="openPopupAddTask('board-in-progress')">+</button>

                </div>
                <div class="board_div">
                    <h3>Await Feedback</h3> <button class="adding_Button" onclick="openPopupAddTask('board-await-feedback')">+</button>
                </div>

                <div class="board_div">
                    <h3>Done</h3>
                </div>
            </div>
        </div>

        <div class="card_mainContainer">
            <div class="card_Div" id="board-to-do" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

            <div class="card_Div2" id="board-in-progress" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

            <div class="card_Div3" id="board-await-feedback" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
            
            <div class="card_Div4" id="board-done" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
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
}
