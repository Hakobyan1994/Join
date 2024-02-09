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