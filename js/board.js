function openPopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    let content = document.getElementById('popup-add-task-content');
    
    popup.classList.remove('d-none');
    content.innerHTML = /*html*/`
        <div onclick="closePopupAddTask(); return false" class="close-img-con">
            <img class="close-img close-popup" src="/assets/img/icons/Close.svg" alt="">
        </div>
        <div class="popup-box">
            <h2>Add Task</h2>
            <div>
                <div class="main-box main-box-popup">
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
}

function closePopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    popup.classList.add('d-none');
}

function renderAddTaskForPopup() {
    e.preventDefault();
    
}