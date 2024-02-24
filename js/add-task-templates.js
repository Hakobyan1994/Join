function generateRenderAddTask(boardcard) {
 return /*html*/`
    <h2>Add Task</h2>
    <div class="main-box">
        <div class="form-addtask">
            ${generateHtmlAddTaskForm()}      
        </div>
        <div class="form-bottom">    
            ${generateHtmlFormSection(`${boardcard}`)}
        </div>  
    </div> 
    `;
}


function generateHtmlAddTaskForm() {
    return /*html*/`
        <form>
            ${generateHtmlTitle()}
            ${generateHtmlDescription()}  
            ${generateHtmlAssigned()}
        </form>
        <p class="addtask-line"></p>
        <form>
            ${generateHtmlDate()}  
            ${generateHtmlPrio()}
            ${generateHtmlCategory()}
            ${generateHtmlSubtasks()}
        </form>
    `;
}


function generateHtmlTitle() {
    return /*html*/`
        <div class="title-div">
            <label>Title<p class="redstar">*</p></label>
            <input type="text" class="inputfield" id="title" placeholder="Enter a title" onfocus="inputfieldFocus('title')" oninput="inputfieldFocus('title')" required>
            <div class="required-text d-none" id="required-title">This field is required</div>
        </div>
    `;
}


function generateHtmlDescription() {
    return /*html*/`
        <label>Description</label>
        <textarea class="inputfield inputfield-textarea" id="description" placeholder="Enter a Description"></textarea>  
    `;
}


function generateHtmlAssigned() {
    return /*html*/`
        <label>Assigned to</label>
        <input class="inputfield assigned-to" placeholder="Select contacts to assign" id="assigned" onclick="renderAssignedList()" onkeyup="searchAssignedList()">
        <img src="/assets/img/icons/dropdown.svg" alt="Dropdown Icon" class="dropdown-icon" onclick="renderAssignedList()">    
        <div class="assigned-list d-none" id="assigned-list"></div>
        <div class="assigned-button" id="assigned-button"></div>
    `;
}


function generateHtmlDate() {
    return /*html*/`
        <label>Due date<p class="redstar">*</p></label>
        <div class="dueDate-div">
            <div>
                <input date="" data-date="" data-date-format="DD MMMM YYYY" value="2024-01-01" type="date" class="inputfield" id="date" placeholder="yyyy-mm-dd" value="" min="2024-01-01" max="2030-12-31" onfocus="inputfieldFocus('date')" oninput="inputfieldFocus('date')" required > <!-- pattern="\d{2}/\m{2}/\y{4}" -->
                <!-- <img src="/assets/img/icons/calender.svg" alt="Calendar" class="date-icon" onclick="currentDateTask()"> -->
            </div>
            <div class="required-text required-text-date d-none" id="required-date">This field is required</div>
        </div>
        
    `;
}


function generateHtmlPrio() {
    return /*html*/`
        <label>Prio</label>
        <div class="prio-btn" id="prio" role="group">
            <button type="button" class="prio prio-urgent prio-notselected" id="urgent" value="urgent">Urgent <img src="/assets/img/icons/prio-urgent.svg" alt="Urgent Prio"></button>
            <button type="button" class="prio prio-medium" id="medium" value="medium">Medium <img src="/assets/img/icons/prio-medium.svg" alt="Medium Prio"></button>
            <button type="button" class="prio prio-low prio-notselected" id="low" value="low">Low <img src="/assets/img/icons/prio-low.svg" alt="Low Prio"></button>
        </div>  
    `;
}


function generateHtmlCategory() {
    return /*html*/`
        <label>Category<p class="redstar">*</p></label>
        <div class="category-div">
            <input class="inputfield category" value="" placeholder="Select task category" id="category" onclick="renderCategoryList()" onfocus="inputfieldFocus('category')" oninput="inputfieldFocus('category')"required readonly>
            <img src="/assets/img/icons/dropdown.svg" alt="Dropdown Icon" class="dropdown-icon" onclick="renderCategoryList()" onfocus="inputfieldFocus('category')" oninput="inputfieldFocus('category')">
            <div class="category-list d-none" id="category-list"></div>
            <div class="required-text d-none" id="required-category" style="margin-top: -16px;">This field is required</div> 
        </div>
    `;
}


function generateHtmlSubtasks() {
    return /*html*/`
        <label id="subtasks-label">Subtasks</label>
        <div style="height: 47px;">
            <input type="text" class="inputfield subtask-input" id="subtask-input"> 
            <img src="/assets/img/icons/add.svg" alt="Add Icon" class="add-icon inputfield-icon-hover" id="subtask-change-add-icon">
            <div class="clear-check-icons d-none" id="subtask-close-check-icon">
                <img src="/assets/img/icons/close.svg" alt="Close Icon" class="clear-check-icons separator-border" id="subtask-close-icon" onclick="clearSubtaskInputField()">
                <img src="/assets/img/icons/check.svg" alt="Check Icon" class="clear-check-icons" id="subtask-check-icon" onclick="addSubtask()" style="margin-left: -5px;">
            </div>
        </div>
        <ul id="subtasks" class="subtasks"></ul>
    `;
}


function generateHtmlFormSection(boardcard) {
    return /*html*/`
        <div class="form-bottom-left"><p><p class="red">*</p>This field is required</p></div>
        <div class="form-bottom-right">
            <button class="clear-btn" id="clear-button" onclick="clearFields()">Clear<img src="/assets/img/icons/close-black1.svg" alt="Clear" id="clear-button-img"></button>
            <button class="create-task" onclick="createTask('${boardcard}')">Create Task<img src="/assets/img/icons/check1.svg" alt="Create Task"></button>
        </div> 
    `;
}
