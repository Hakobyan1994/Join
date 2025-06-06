/**
 * Renders the main add task section.
 */
async function renderAddTaskMain() {
    let content = document.getElementById('render-add-task');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainAddTask();
    renderAddTask();
    await getAllContacts();
    resetGlobalVariables();
}


/**
 * Renders the add task section.
 */
async function renderAddTask() {
    let content = document.getElementById('add-task');
    content.innerHTML = '';
    let boardcard = 'board-to-do';
    content.innerHTML = generateRenderAddTask(boardcard);
    addEventFunctions();
    subtasks = [];
    addSubtask();
    await getCurrentDate();
}


/**
 * Adds event functions to elements in the add task section.
 */
async function addEventFunctions() {
    getPrio();
    document.getElementById('prio').addEventListener('click', getPrio);
    clearButtonImgChange();
    setupSubtaskInputFocus();
    setupSubtaskInputFocus();
    enterOnSubtask();
    inputfieldFocus();
    closeList('assigned-list', 'assigned', 'dropdown-assigned');
    closeList('category-list', 'category', 'dropdown-category');
}


/**
 * Generates the HTML for the main add task section.
 * 
 * @returns {string} - The HTML string for the main add task section.
 */
function generateHtmlMainAddTask() {
    return /*html*/`
        <div id="add-task" class="main-window main-window-add-task"></div>
            <div class="popup-a-to-b d-none" id="popup-a-to-b">
            <img src="../assets/img/task-to-board.svg" alt="">
        </div>
    `;
}


/**
 * Generates the HTML for rendering the add task section.
 * 
 * @param {string} boardcard - The identifier of the board card.
 * @returns {string} - The HTML string for rendering the add task section.
 */
function generateRenderAddTask(boardcard) {
    return /*html*/`
    <div class="mobile-view mobile-add-task-view">
        <h2>Add Task</h2>
        <div class="main-box mobile-main-box">
            <div class="form-addtask">
                ${generateHtmlAddTaskForm()}      
            </div>
            <div class="form-bottom">    
                ${generateHtmlFormSection(`${boardcard}`)}
            </div>  
        </div> 
    </div>
    `;
}


/**
 * Generates the HTML for the add task form.
 * 
 * @returns {string} - The HTML string for the add task form.
 */
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


/**
 * Generates the HTML for the title input field.
 * 
 * @returns {string} - The HTML string for the title input field.
 */
function generateHtmlTitle() {
    return /*html*/`
        <div class="title-div">
            <label>Title<p class="redstar">*</p></label>
            <input type="text" class="inputfield" id="title" placeholder="Enter a title" onfocus="inputfieldFocus('title')" oninput="inputfieldFocus('title')" required>
            <div class="required-text d-none" id="required-title">This field is required</div>
        </div>
    `;
}


/**
 * Generates the HTML for the description input field.
 * 
 * @returns {string} - The HTML string for the description input field.
 */
function generateHtmlDescription() {
    return /*html*/`
        <label>Description</label>
        <textarea class="inputfield inputfield-textarea" id="description" placeholder="Enter a Description"></textarea>  
    `;
}


/**
 * Generates the HTML for the assigned contacts input field.
 * 
 * @returns {string} - The HTML string for the assigned contacts input field.
 */
function generateHtmlAssigned() {
    return /*html*/`
        <label>Assigned to</label>
        <input class="inputfield assigned-to" placeholder="Select contacts to assign" id="assigned" onfocus="renderAssignedList()" onkeypress="renderAssignedList()" onkeyup="searchAssignedList()">
        <img src="../assets/img/icons/dropdown.svg" alt="Dropdown Icon" class="dropdown-icon" id="dropdown-assigned" onclick="toggleAssignedlist()">    
        <div class="assigned-list d-none" id="assigned-list"></div>
        <div class="assigned-button" id="assigned-button"></div>
    `;
}


/**
 * Generates the HTML for the due date input field.
 * 
 * @returns {string} - The HTML string for the due date input field.
 */
function generateHtmlDate() {
    return /*html*/`
        <label>Due date<p class="redstar">*</p></label>
        <div class="dueDate-div">
            <div>
                <input type="date" class="inputfield" id="date" value="" min="" max="2030-12-31" onfocus="inputfieldFocus('date')" oninput="inputfieldFocus('date')" required>
            </div>
            <div class="required-text required-text-date d-none" id="required-date">This field is required</div>
        </div>
    `;
}


/**
 * Generates the HTML for the priority selection buttons.
 * 
 * @returns {string} - The HTML string for the priority selection buttons.
 */
function generateHtmlPrio() {
    return /*html*/`
        <label>Prio</label>
        <div class="prio-btn" id="prio" role="group">
            <button type="button" class="prio prio-urgent prio-notselected" id="urgent" value="urgent">Urgent <img src="../assets/img/icons/prio-urgent.svg" alt="Urgent Prio"></button>
            <button type="button" class="prio prio-medium" id="medium" value="medium">Medium <img src="../assets/img/icons/prio-medium.svg" alt="Medium Prio"></button>
            <button type="button" class="prio prio-low prio-notselected" id="low" value="low">Low <img src="../assets/img/icons/prio-low.svg" alt="Low Prio"></button>
        </div>  
    `;
}


/**
 * Generates the HTML for the category input field.
 * 
 * @returns {string} - The HTML string for the category input field.
 */
function generateHtmlCategory() {
    return /*html*/`
        <label>Category<p class="redstar">*</p></label>
        <div class="category-div">
            <input class="inputfield category" value="" placeholder="Select task category" id="category" onclick="renderCategoryList()" onfocus="inputfieldFocus('category')" oninput="inputfieldFocus('category')"required readonly>
            <img src="../assets/img/icons/dropdown.svg" alt="Dropdown Icon" class="dropdown-icon" id="dropdown-category"  onclick="renderCategoryList()" onfocus="inputfieldFocus('category')" oninput="inputfieldFocus('category')">
            <div class="category-list d-none" id="category-list"></div>
            <div class="required-text d-none" id="required-category" style="margin-top: -19px;">This field is required</div> 
        </div>
    `;
}


/**
 * Generates the HTML for the subtasks input field.
 * 
 * @returns {string} - The HTML string for the subtasks input field.
 */
function generateHtmlSubtasks() {
    return /*html*/`
        <label id="subtasks-label">Subtasks</label>
        <div style="height: unset;">
            <input type="text" class="inputfield subtask-input" id="subtask-input"> 
            <img src="../assets/img/icons/add.svg" alt="Add Icon" class="add-icon inputfield-icon-hover" id="subtask-change-add-icon">
            <div class="clear-check-icons d-none" id="subtask-close-check-icon">
                <img src="../assets/img/icons/Close.svg" alt="Close Icon" class="h-10 clear-check-icons separator-border" id="subtask-close-icon" onclick="clearSubtaskInputField()">
                <img src="../assets/img/icons/check.svg" alt="Check Icon" class="h-10 clear-check-icons" id="subtask-check-icon" onclick="addSubtask()" style="margin-left: -5px;">
            </div>
        </div>
        <ul id="subtasks" class="subtasks"></ul>
    `;
}


/**
 * Generates the HTML for the form bottom section.
 *  
 * @param {string} boardcard - The identifier of the board card.
 * @returns {string} - The HTML string for the form bottom section.
 */
function generateHtmlFormSection(boardcard) {
    return /*html*/`
        <div id="information-text" class="form-bottom-left"><p><p class="red">*</p>This field is required</p></div>
         
        <div class="form-bottom-right">
            <button class="clear-btn" id="clear-button" onclick="clearFields()">Clear<img src="../assets/img/icons/close-black1.svg" alt="Clear" id="clear-button-img"></button>
            <button class="create-task" onclick="createTask('${boardcard}')">Create Task<img src="../assets/img/icons/check1.svg" alt="Create Task"></button>
        </div>
        <div style="display:none" id="isTaskCreated"></div> 
    `;
}


/**
 * Generates the HTML for the assigned contact list item.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} img - The initials or avatar of the contact.
 * @param {boolean} isSelected - Indicates whether the contact is selected.
 * @param {number} i - The index of the contact.
 * @returns {string} - The HTML string for the assigned contact list item.
 */
function generateHtmlAssignedList(name, img, isSelected, i) {
    return /*html*/`
        <div class="assigned-contact-list ${isSelected ? 'select-contact-blue white' : ''}" id="assigned-contacts-${i}" onclick="selectAssignedContacts(${i})">
            <div>
                <img src="https://ui-avatars.com/api/?name=${img}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon">
                <div id="contact-name-${i}">${name}</div>
            </div>
            <img src="${isSelected ? '../assets/img/icons/selected1.svg' : '../assets/img/icons/none-selected1.svg'}" alt="" class="${isSelected ? 'checkbox-selected' : 'checkbox-none-selected'}" id="checkbox-contact-${i}">
        </div>
    `;
}


/**
 * Renders the category list.
 */
function renderCategoryList() {
    let list = document.getElementById('category-list');
    list.classList.toggle('d-none');
    list.innerHTML = /*html*/`
        <div class="category-list-div" value="Technical Task"  id="technical" onclick="selectCategory('technical', 'story')">Technical Task</div>  
        <div class="category-list-div" value="User Story" id="story" onclick="selectCategory('story', 'technical')">User Story</div>  
    `;
}

/**
 * Generates the HTML for the assigned button.
 */
function generateAssignedButton() {
    let div = document.getElementById('assigned-button');
    div.innerHTML = '';
    for (let p = 0; p < selectedNamesFormat.length; p++) {
        let formatedValue='';    
        const names=selectedNamesFormat[p]
        const spliteNames=names.trim().split(" ");
        if(spliteNames.length===1){
            formatedValue=spliteNames[0].charAt(0).toUpperCase();
        }else {
            formatedValue=spliteNames[0].charAt(0).toUpperCase()+ spliteNames[1].charAt(0).toUpperCase()
        }
        // const letters = iniimg[p];
        div.innerHTML += /*html*/`
            <img src="https://ui-avatars.com/api/?name=${formatedValue}&background=random&color=fff" alt="Initials ${formatedValue}" class="assigned-contact-list-icon">  
        `; 
    } 
}


/**
 * Updates the subtask list.
 * 
 * @param {HTMLElement} list - The HTML element representing the subtask list.
 */
function updateSubtaskList(list) {
    for (let i = 0; i < subtasks.length; i++) {
        let text = subtasks[i];
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


/**
 * Creates an editable subtask element.
 * 
 * @param {number} index - The index of the subtask.
 * @param {string} value - The value of the subtask.
 * @returns {string} - The HTML for the editable subtask element.
 */
function createEditableSubtaskElement(index, value) {
    return /*html*/`
        <input class="each-subtask-p editable" id="subtask${index}" value="${value}">
        <div class="subtask-right editable-img">
            <img src="../assets/img/icons/trash.svg" alt="Edit" onclick="deleteSubtask(${index})">
            <p class="separator"></p>
            <img src="../assets/img/icons/check.svg" alt="Edit" onclick="pushEditedSubtask(${index})">
        </div>
    `;
}


/**
 * Generates the HTML for a subtask element.
 * 
 * @param {number} i - The index of the subtask.
 * @param {string} text - The text content of the subtask.
 * @returns {string} - The HTML for the subtask element.
 */
function generateSubtaskElement(i, text) {
    return /*html*/`
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


/**
 * Sets the minimum date and current date value for the date input field.
 */
function getCurrentDate() {
    document.getElementById('date').min = minDate();
    document.getElementById('date').value = minDate();
}