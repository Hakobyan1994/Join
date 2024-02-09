let tasks = [];
let subtasks = [];


function renderAddTask() {
    let content = document.getElementById('add-task');


    content.innerHTML = /*html*/`
        <h2>Add Task</h2>
        <div class="main-box">
            <div class="form">
                ${generateHtmlAddTaskForm()}      
            </div>
            ${generateHtmlFormSection()}
        </div>    
    `;
    addEventFunctions();
}

async function addEventFunctions() {
    await loadTasks();
    currentDate();
    getPrio();
    document.getElementById('prio').addEventListener('click', getPrio);
    clearButtonImgChange();
    setupSubtaskInputFocus();
    setupSubtaskInputFocus();
    addSubtask();
    enterOnSubtask();
    await loadContacts();
    loadContactsInAddTask();
}


function generateHtmlAddTaskForm() {
    return /*html*/`
        <form>
            ${generateHtmlTitle()}
            ${generateHtmlDescription()}  
            ${generateHtmlAssigned()}
        </form>
        <p class="line"></p>
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
        <div class="">
            <label for="" class="">Title<p class="redstar">*</p></label>
            <input type="text" class="inputfield" id="title" placeholder="Enter a title" required>
        </div>
    `;
}


function generateHtmlDescription() {
    return /*html*/`
        <label class="">Description</label>
        <textarea class="inputfield inputfield-textarea" id="description" placeholder="Enter a Description"></textarea>  
    `;
}


function generateHtmlAssigned() {
    return /*html*/`
        <label>Assigned to</label>
        <select class="inputfield assigned-to" id="assigned">
            <option value="" disabled selected hidden>Select contacts to assign</option>
        </select>  
    `;
}


function generateHtmlDate() {
    return /*html*/`
        <label for="" class="">Due date<p class="redstar">*</p></label>
        <div>
            <input type="date" class="inputfield date-icon" id="date" placeholder="dd/mm/yyyy" required>
            <!-- <img src="/assets/img/icons/calender.svg" alt="Calender"> ///// Calender Icon is missing --> 
        </div>
        <div id="" class="d-none">
            This field is required
        </div>  
    `;
}


function generateHtmlPrio() {
    return /*html*/`
        <label for="">Prio</label>
        <div class="prio-btn" id="prio" role="group">
            <button type="button" class="prio prio-urgent prio-notselected" id="urgent" value="urgent">Urgent <img src="/assets/img/icons/prio-urgent.svg" alt="Urgent Prio"></button>
            <button type="button" class="prio prio-medium prio-notselected" id="medium" value="medium">Medium <img src="/assets/img/icons/prio-medium.svg" alt="Medium Prio"></button>
            <button type="button" class="prio prio-low prio-notselected" id="low" value="low">Low <img src="/assets/img/icons/prio-low.svg" alt="Low Prio"></button>
        </div>  
    `;
}


function generateHtmlCategory() {
    return /*html*/`
        <label>Category<p class="redstar">*</p></label>
        <select class="inputfield" id="category">
            <option selected>Select task category</option>
            <option value="technical task">Technical Task</option>
            <option value="user story">User Story</option>
        </select>  
    `;
}


function generateHtmlSubtasks() {
    return /*html*/`
        <label for="">Subtasks</label>
        <div style="height: 64px;">
            <input type="text" class="inputfield" id="subtask-input"> 
            <img src="/assets/img/icons/add.svg" alt="Add Icon" class="add-icon inputfield-icon-hover" id="subtask-change-add-icon">
            <div class="clear-check-icons d-none" id="subtask-close-check-icon">
                <img src="/assets/img/icons/close.svg" alt="Close Icon" class="clear-check-icons separator-border" id="subtask-close-icon" onclick="clearSubtaskInputField()">
                <img src="/assets/img/icons/check.svg" alt="Check Icon" class="clear-check-icons" id="subtask-check-icon" onclick="addSubtask()">
            </div>
        </div>
        <ul id="subtasks" class="subtasks"></ul>
    `;
}


function generateHtmlFormSection() {
    return /*html*/`
        <div class="form-bottom">
            <div class="form-bottom-left"><p><p class="red">*</p>This field is required</p></div>
            <div class="form-bottom-right">
                <button class="clear-btn" id="clear-button" onclick="clearFields()">Clear<img src="/assets/img/icons/close1.svg" alt="Clear" id="clear-button-img"></button>
                <button class="create-task" onclick="createTask()">Create Task<img src="/assets/img/icons/check1.svg" alt="Create Task"></button>
            </div>
        </div>  
    `;
}


function loadContactsInAddTask() {
    let optionValue = document.getElementById('assigned');
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i].name;
        optionValue.innerHTML += /*html*/`
            <option value="${name}">${name}</option>
        `;    
    }
}


function currentDate() {
    let date = new Date();                              // get the actual date

    let day = date.getDate();           
    let month = date.getMonth() + 1;                    // month starts with 0, thats why +1
    let year = date.getFullYear();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let today = year + '-' + month + '-' + day;       
    document.getElementById("date").value = today;
}


function pushPrio() {
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');

    let selectedPriority = null;

    prioButtons.forEach(function(button) {
        if (!button.classList.contains('prio-notselected')) {
            selectedPriority = button.value;
        }
    });

    return selectedPriority;
}


function getPrio() {
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');

    prioButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation();

            if(!button.classList.contains('prio-notselected')) {
                button.classList.add('prio-notselected')
            } else {
                prioButtons.forEach(function(btn){
                    btn.classList.remove('prio-notselected');
                    btn.classList.add('prio-notselected');
                });
    
                button.classList.add('prio-notselected');
                button.classList.remove('prio-notselected');
            }
        });
    });
}


function setupSubtaskInputFocus() {
    let subtask = document.getElementById('subtask-input');
    let add = document.getElementById('subtask-change-add-icon');
    let closeCheck = document.getElementById('subtask-close-check-icon');
    
    function handleFocus() {
        add.classList.add('d-none');
        closeCheck.classList.remove('d-none');
    }
    function handleBlur() {
        add.classList.remove('d-none');
        closeCheck.classList.add('d-none');
    }
    function handleInput() {
        if (subtask.value.trim() !== '') {
            handleFocus();
        }
    }

    subtask.addEventListener('focus', handleFocus);
    subtask.addEventListener('blur', function() {
        if (subtask.value.trim() !== '') {
            handleFocus();
        } else {
            handleBlur();
        }
    });
    subtask.addEventListener('input', handleInput);
}

function enterOnSubtask() {
    let input = document.getElementById('subtask-input');

    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('subtask-check-icon').click();
        }
    })
}


function addSubtask() {
    let content = document.getElementById('subtask-input');
    let list = document.getElementById('subtasks');
    let subtask = content.value;
    list.innerHTML = '';

    if (subtask.trim() === '') {
        console.log('Subtask Feld darf nicht leer sein');
        updateSubtasklist();
        return;
    }

    subtasks.push(subtask);   

    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += /*html*/`
        <li class="each-subtask" id="each-subtask${i}">
            <div class="each-subtask-p" id="subtask${i}"><p class="subtask-p"></p>${text}</div>
            <div class="subtask-right">
                <img src="/assets/img/icons/edit.svg" alt="Edit" onclick="editSubtask(${i})">
                <p class="separator"></p>
                <img src="/assets/img/icons/trash.svg" alt="Edit" onclick="deleteSubtask(${i})">
            </div>
        </li>
    `;        
    }

    content.value = '';
}


function editSubtask(i) {
    let subtaskInput = document.getElementById(`subtask${i}`);
    let listItem = document.getElementById(`each-subtask${i}`);
    let inputValue = subtaskInput.innerText || subtaskInput.textContent;

    listItem.classList.add('editable-each');
    listItem.innerHTML = /*html*/`
        <input class="each-subtask-p editable" id="subtask${i}" value="${inputValue}">
        <div class="subtask-right editable-img">
            <img src="/assets/img/icons/trash.svg" alt="Edit" onclick="deleteSubtask(${i})">
            <p class="separator"></p>
            <img src="/assets/img/icons/check.svg" alt="Edit" onclick="pushEditedSubtask(${i})">
        </div>
    `;
}


function deleteSubtask(i) {
    let position = i;
    subtasks.splice(position, 1);

    let list = document.getElementById('subtasks');
    list.innerHTML = '';    

    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += /*html*/`
        <li class="each-subtask" id="each-subtask${i}">
            <div class="each-subtask-p" id="subtask${i}"><p class="subtask-p"></p>${text}</div>
            <div class="subtask-right">
                <img src="/assets/img/icons/edit.svg" alt="Edit" onclick="editSubtask(${i})">
                <p class="separator"></p>
                <img src="/assets/img/icons/trash.svg" alt="Edit" onclick="deleteSubtask(${i})">
            </div>
        </li>
    `;        
    }
}

function pushEditedSubtask(i) {
    let inputField = document.getElementById(`subtask${i}`);
    let newText = inputField.value;
    let position = i;

        if (newText.trim() !== '') {
            subtasks.splice(position, 1, newText);
            updateSubtasklist();
        } else {
            console.log('Das Feld ist leer')
        };
}

function updateSubtasklist() {
    let list = document.getElementById('subtasks');
    list.innerHTML = '';

    for (let k = 0; k < subtasks.length; k++) {
        const text = subtasks[k];
        list.innerHTML += /*html*/`
        <li class="each-subtask" id="each-subtask${k}">
            <div class="each-subtask-p" id="subtask${k}"><p class="subtask-p"></p>${text}</div>
            <div class="subtask-right">
                <img src="/assets/img/icons/edit.svg" alt="Edit" onclick="editSubtask(${k})">
                <p class="separator"></p>
                <img src="/assets/img/icons/trash.svg" alt="Edit" onclick="deleteSubtask(${k})">
            </div>
        </li>`;
    }
}

function clearSubtaskInputField() {
    let input = document.getElementById('subtask-input');
    input.value = '';
}


function clearButtonImgChange() {
    let img = document.getElementById('clear-button-img');
    let clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('mouseover', function() {
        img.src = '/assets/img/icons/close-blue.svg';
    });
    clearButton.addEventListener('mouseout', function() {
        img.src = '/assets/img/icons/close.svg';
    });
}


function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('assigned').value = '';
    document.getElementById('date').value = '';
    subtasks = [];
    updateSubtasklist();
    let prio = document.querySelectorAll('.prio');
    prio.forEach(function(button) {
        if(!button.classList.contains('prio-notselected')) {
            button.classList.add('prio-notselected');
        }
    });
}


async function createTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assigned = document.getElementById('assigned');
    let date = document.getElementById('date');
    let priority = pushPrio();
    let category = document.getElementById('category');

    if (title.value && date.value && category.value) {
        await loadTasks();

        let newTask = {
            title: title.value,
            description: description.value,
            assigned: assigned.value,
            date: date.value,
            priority: priority,
            category: category.value,
            subtask: subtasks
        };

        clearFields();
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        let popup = document.getElementById('popup-add-task');
        if (popup) {
            popup.classList.add('d-none');
            loadToDo();
        } else {
            console.log('Popup wurde nicht gefunden');
        }
    } else {
        console.log('Notwendige Felder wurden nicht ausgefüllt');
    }

    return tasks;
}

function saveTasks(newTask) {
    loadTasks();
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let taskLocal = localStorage.getItem('tasks');
    tasks = taskLocal ? JSON.parse(taskLocal) : [];
}

