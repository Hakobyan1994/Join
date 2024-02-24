async function openPopupAddTask(boardcard) {
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
