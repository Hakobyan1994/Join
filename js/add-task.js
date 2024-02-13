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
            </div>    
            <div style="width: 100%;">    
                ${generateHtmlFormSection()}
            </div>  
    `;
    addEventFunctions();
}

async function addEventFunctions() {
    await loadContacts();
    await loadTasks();
    currentDate();
    getPrio();
    document.getElementById('prio').addEventListener('click', getPrio);
    clearButtonImgChange();
    setupSubtaskInputFocus();
    setupSubtaskInputFocus();
    addSubtask();
    enterOnSubtask();
    dueDatePattern();
    inputfieldFocus();
    inputfieldFocusDate();
    inputfieldFocusCategory();
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
        <div class="title-div">
            <label for="" class="">Title<p class="redstar">*</p></label>
            <input type="text" class="inputfield" id="title" placeholder="Enter a title" onfocus="inputfieldFocus()" oninput="inputfieldFocus()" required>
            <div class="required-text d-none" id="required-title">This field is required</div>
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
        <input class="inputfield assigned-to" placeholder="Select contacts to assign" id="assigned" onfocus="activeAssignedTo()" onblur="deactiveAssignedTo()">
        <img src="/assets/img/icons/dropdown.svg" alt="Dropdown Icon" class="dropdown-icon" onclick="renderAssignedList()">    
        <div class="assigned-list d-none" id="assigned-list"></div>
        <!-- <option value="" disabled selected hidden>Select contacts to assign</option> -->
    `;
}


function generateHtmlDate() {
    return /*html*/`
        <label for="date">Due date<p class="redstar">*</p></label>
        <div class="dueDate-div">
            <div>
                <input type="text" class="inputfield" id="date" pattern="\d{2}/\d{2}/\d{4}" placeholder="dd/mm/yyyy" onfocus="inputfieldFocusDate()" oninput="inputfieldFocusDate()" required>
                <img src="/assets/img/icons/calender.svg" alt="Calendar" class="date-icon" onclick="currentDate()">
            </div>
            <div class="required-text required-text-date d-none" id="required-date">This field is required</div>
        </div>
        
    `;
}


function generateHtmlPrio() {
    return /*html*/`
        <label for="">Prio</label>
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
            <select class="inputfield" id="category" onclick="inputfieldFocusCategory()" required>
                <option value="" disabled selected hidden>Select task category</option>
                <option value="Technical Task">Technical Task</option>
                <option value="User Story">User Story</option>
            </select>
            <div class="required-text d-none" id="required-category">This field is required</div> 
        </div>
 
    `;
}


function generateHtmlSubtasks() {
    return /*html*/`
        <label for="">Subtasks</label>
        <div style="height: 64px;">
            <input type="text" class="inputfield subtask-input" id="subtask-input"> 
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

function activeAssignedTo() {
    let input = document.getElementById('assigned');
    input.placeholder = '';
}

function deactiveAssignedTo() {
    let input = document.getElementById('assigned');
    input.placeholder = 'Select contacts to assign';
}

function renderAssignedList() {
    let list = document.getElementById('assigned-list');
    list.classList.toggle('d-none');
    list.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i].name;
        const img = contacts[i].initials;
        list.innerHTML += /*html*/`
            <div class="assigned-contact-list" id="assigned-contacts-${i}" onclick="selectAssignedContacts(${i})">
                <div>
                    <img src="https://ui-avatars.com/api/?name=${img}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon">
                    <div>${name}</div>
                </div>
                <input type="checkbox" id="checkbox-contact-${i}">
            </div>
        `;    
    }
}

function selectAssignedContacts(i) {
    let contact = document.getElementById(`assigned-contacts-${i}`);
    let checkbox = document.getElementById(`checkbox-contact-${i}`);
    contact.classList.toggle('select-contact-blue');
    contact.classList.toggle('white');
    checkbox.checked = !checkbox.checked;


}


function currentDate() {
    let border = document.getElementById('date');
    let date = new Date();                              // get the actual date

    let day = date.getDate();           
    let month = date.getMonth() + 1;                    // month starts with 0, thats why +1
    let year = date.getFullYear();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let today = `${day}/${month}/${year}`;
    document.getElementById("date").value = today;
    border.classList.remove('inputfield-focus-white');
    border.classList.add('inputfield-focus-blue');
}


function dueDatePattern() {
    let dateInput = document.getElementById('date');

    dateInput.addEventListener('input', function () {
        let isValid = /^\d{2}\/\d{2}\/\d{4}$/.test(dateInput.value);

        if (!isValid) {
            dateInput.setCustomValidity('Ungültiges Datumsformat. Verwende das Format dd/mm/yyyy.');
        } else {
            dateInput.setCustomValidity('');
        }
    });
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

    if (selectedPriority === null) {
        selectedPriority = 'medium';
    }

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
    let medium = document.getElementById('medium');
    prio.forEach(function(button) {
        if(!button.classList.contains('prio-notselected')) {
            button.classList.add('prio-notselected');
            medium.classList.remove('prio-notselected');
        } 
    });
}


async function createTask() {
    let title = document.getElementById('title');
    let requiredTitle = document.getElementById('required-title');
    let requiredDate = document.getElementById('required-date');
    let requiredCategory = document.getElementById('required-category');
    let description = document.getElementById('description');
    let assigned = document.getElementById('assigned');
    let date = document.getElementById('date');
    let priority = pushPrio();
    let category = document.getElementById('category');

    if (title.value && date.value && category.value) {
        
        let existingTasks = JSON.parse(await getItem('testaufgaben')) || [];

        if (!Array.isArray(existingTasks)) {
            existingTasks = [];
        }

        let newTask = {
            title: title.value,
            description: description.value,
            assigned: assigned.value,
            date: date.value,
            priority: priority,
            category: category.value,
            subtask: subtasks
        };

        existingTasks.push(newTask);

        await setItem('testaufgaben', JSON.stringify(existingTasks));
        clearFields();
       
        let popup = document.getElementById('popup-add-task');
        let popupAdd = document.getElementById('popup-boardAddTask');
        if (popup) {
            popup.classList.add('d-none');
            popupAdd.classList.remove('d-none');
            await openToBoard();
        } else {
            console.log('Popup wurde nicht gefunden');
        }
    } else {
        alert('Notwendige Felder wurden nicht ausgefüllt');
        requiredTitle.classList.remove('d-none');
        requiredDate.classList.remove('d-none');
        requiredCategory.classList.remove('d-none');
        date.classList.add('inputfield-focus-red');
        title.classList.add('inputfield-focus-red');
        category.classList.add('inputfield-focus-red');
    }

    await openToBoard();
    return tasks;
    
}


function inputfieldFocus() {
    let title = document.getElementById('title');
    let required = document.getElementById('required-title');

    if (document.activeElement === title) {
        if (title.value.trim() === '') {
            title.classList.add('inputfield-focus-red');
            required.classList.remove('d-none');
            title.classList.remove('inputfield-focus-blue');
            title.classList.remove('inputfield-focus-white');
        } else {
            title.classList.add('inputfield-focus-blue');
            required.classList.add('d-none');
            title.classList.remove('inputfield-focus-red');
            title.classList.remove('inputfield-focus-white');
        }
    } else {
        title.classList.remove('inputfield-focus-red');
        title.classList.remove('inputfield-focus-blue');
        title.classList.add('inputfield-focus-white');
        required.classList.add('d-none');
    }
    title.addEventListener('blur', function() {
        title.classList.remove('inputfield-focus-red');
        required.classList.add('d-none');
    });
}

function inputfieldFocusDate() {
    let date = document.getElementById('date');
    let required = document.getElementById('required-date');

    if (document.activeElement === date) {
        if (date.value.trim() === '') {
            date.classList.add('inputfield-focus-red');
            required.classList.remove('d-none');
            date.classList.remove('inputfield-focus-blue');
            date.classList.remove('inputfield-focus-white');
        } else {
            date.classList.add('inputfield-focus-blue');
            required.classList.add('d-none');
            date.classList.remove('inputfield-focus-red');
            date.classList.remove('inputfield-focus-white');
        }
    } else {
        date.classList.remove('inputfield-focus-red');
        date.classList.remove('inputfield-focus-blue');
        date.classList.add('inputfield-focus-white');
        required.classList.add('d-none');
    }
    date.addEventListener('blur', function() {
        date.classList.remove('inputfield-focus-red');
        required.classList.add('d-none');
    });
}


function inputfieldFocusCategory() {
    let category = document.getElementById('category');
    let required = document.getElementById('required-category');

    if (document.activeElement === category) {
        if (category.value.trim() === '') {
            category.classList.add('inputfield-focus-red');
            required.classList.remove('d-none');
            category.classList.remove('inputfield-focus-blue');
            category.classList.remove('inputfield-focus-white');
        } else {
            required.classList.add('d-none');
            category.classList.add('inputfield-focus-blue');
            category.classList.remove('inputfield-focus-red');
            category.classList.remove('inputfield-focus-white');
        }
    } else {
        required.classList.add('d-none');
        category.classList.add('inputfield-focus-white');
        category.classList.remove('inputfield-focus-red');
        category.classList.remove('inputfield-focus-blue');
    }
    category.addEventListener('blur', function() {
        category.classList.remove('inputfield-focus-red');
        required.classList.add('d-none');
    });
}

function openToBoard() {
    let popup = document.getElementById('popup-a-to-b');

    if (popup) {
        popup.classList.remove('d-none');
        setTimeout(() => {
            window.location.href = "/files/board.html";
        }, "1000");
    } else {
        console.log('Popup wurde nicht gefunden');
        window.location.href = "/files/board.html";
    }
    
}


async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('testaufgaben')) || [];
    } catch (e) {
        console.error('Error in loadTasks:', e);
    }
}

