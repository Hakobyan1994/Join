let tasks = [];
let subtasks = [];
let users = [];
let iniimg = [];


function renderAddTask() {
    let content = document.getElementById('add-task');

    content.innerHTML = /*html*/`
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
    addEventFunctions();
    addSubtask();
}

async function addEventFunctions() {
    await loadContacts();
    await loadTasks();
    currentDateTask();
    getPrio();
    document.getElementById('prio').addEventListener('click', getPrio);
    clearButtonImgChange();
    setupSubtaskInputFocus();
    setupSubtaskInputFocus();
    enterOnSubtask();
    dueDatePattern();
    inputfieldFocus();
    loadSelectedPage();
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
                <input type="text" class="inputfield" id="date" pattern="\d{2}/\m{2}/\y{4}" placeholder="dd/mm/yyyy" onfocus="inputfieldFocus('date')" oninput="inputfieldFocus('date')" required>
                <img src="/assets/img/icons/calender.svg" alt="Calendar" class="date-icon" onclick="currentDateTask()">
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
            <!-- <select class="inputfield" id="category" onclick="inputfieldFocusCategory()" required>
                <option value="" disabled selected hidden>Select task category</option>
                <option value="Technical Task">Technical Task</option>
                <option value="User Story">User Story</option>
            </select> -->
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


function renderAssignedList() {
    let list = document.getElementById('assigned-list');
    let input = document.getElementById('assigned');
         if (list.classList.contains('d-none')) {
             input.placeholder = '';
         } else {
             input.placeholder = 'Select contacts to assign';
         }
    list.classList.toggle('d-none');
    list.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i].name;
        const img = contacts[i].initials;

        const userIndex = users.indexOf(name);
        const isSelected = userIndex !== -1;
        list.innerHTML += /*html*/`
            <div class="assigned-contact-list ${isSelected ? 'select-contact-blue white' : ''}" id="assigned-contacts-${i}" onclick="selectAssignedContacts(${i})">
                <div>
                    <img src="https://ui-avatars.com/api/?name=${img}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon">
                    <div>${name}</div>
                </div>
                <img src="${isSelected ? '/assets/img/icons/selected1.svg' : '/assets/img/icons/none-selected1.svg'}" alt="" class="${isSelected ? 'checkbox-selected' : 'checkbox-none-selected'}" id="checkbox-contact-${i}">
            </div>
        `;    
    }
    hideAssignedButton();
    
}


function searchAssignedList() {
    let input = document.getElementById('assigned');
    let filter = input.value.toUpperCase();

    for (let i = 0; i < contacts.length; i++) {
        let list = document.getElementById(`assigned-contacts-${i}`);
        let array = contacts[i].name;
        let name = array.toUpperCase();
        if(name.indexOf(filter) > -1) {
            list.style.display = 'flex';
        } else {
            list.style.display = 'none';
        }
    }
}

function hideAssignedButton() {
    let buttons = document.getElementById('assigned-button');
    let list = document.getElementById('assigned-button');
    if(!list.classList.contains('d-none')) {
        buttons.classList.add('d-none');
    } else {
        buttons.classList.remove('d-none');
    }
}



function renderCategoryList() {
    let list = document.getElementById('category-list');
    list.classList.toggle('d-none');
    list.innerHTML = /*html*/`
        <div class="category-list-div" value="Technical Task"  id="technical" onclick="selectCategory('technical')">Technical Task</div>  
        <div class="category-list-div" value="User Story" id="story" onclick="selectCategory('story')">User Story</div>  
    `;
}

function selectCategory(category) {
    let technical = document.getElementById('technical');
    let story = document.getElementById('story');
    let input = document.getElementById('category');

    if (category === 'technical') {
        technical.classList.toggle('grey');
        technical.classList.toggle('white-bg');
        story.classList.remove('grey');
        story.classList.remove('white-bg');
        input.focus();
    }

    else if (category === 'story') {
        story.classList.toggle('grey');
        story.classList.toggle('white-bg');
        technical.classList.remove('grey');
        technical.classList.remove('white-bg');
        input.focus();
    }
    pushCategorytoInput(category);
    inputfieldFocus('category');
}


function pushCategorytoInput(category) {
    let categoryInput = document.getElementById('category');
    let approvedElements = document.querySelectorAll('.grey');
    let list = document.getElementById('category-list');

    if (approvedElements.length > 0) {
        categoryInput.value = approvedElements[0].textContent;
        list.classList.add('d-none');
    } else {
        categoryInput.value = '';
        inputfieldFocus('category');
    }

}


function selectAssignedContacts(i) {
    let contact = document.getElementById(`assigned-contacts-${i}`);
    let checkbox = document.getElementById(`checkbox-contact-${i}`);
    contact.classList.toggle('select-contact-blue');
    contact.classList.toggle('white');
    if(contact.classList.contains('select-contact-blue')) {
        checkbox.src = '/assets/img/icons/selected1.svg';
        checkbox.classList.remove('checkbox-none-selected');
        checkbox.classList.add('checkbox-selected');
        
    } else {
        checkbox.src = '/assets/img/icons/none-selected1.svg';
        checkbox.classList.add('checkbox-none-selected');
        checkbox.classList.remove('checkbox-selected');
    }
    pushUser(i);
}


function pushUser(i) {
    let contact = document.getElementById(`assigned-contacts-${i}`);
    let approved = contact.classList.contains('select-contact-blue');
    let user = contacts[i].name;
    let img = contacts[i].initials;
    if (approved) {
        let index = users.indexOf(user);
        if (index === -1) {
            users.push(user);
            iniimg.push(img);
        }
    } else {
        let index = users.indexOf(user);
        if (index !== -1) {
            users.splice(index, 1);
            iniimg.splice(index, 1);
        }
    }

    generateAssignedButton();
}

function generateAssignedButton() {
    let div = document.getElementById('assigned-button');
    div.innerHTML = '';
    for (let p = 0; p < users.length; p++) {
        const letters = iniimg[p];
        div.innerHTML += /*html*/`
            <img src="https://ui-avatars.com/api/?name=${letters}&background=random&color=fff" alt="Initials ${letters}" class="assigned-contact-list-icon">  
        `;
        
    }
}

function currentDateTask() {
    let border = document.getElementById('date');
    let date = new Date();                              

    let day = date.getDate();           
    let month = date.getMonth() + 1;                   
    let year = date.getFullYear();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let today = `${day}/${month}/${year}`;
    document.getElementById("date").value = today;
    border.classList.remove('inputfield-focus-white');
}


function dueDatePattern() {
    let dateInput = document.getElementById('date');

    dateInput.addEventListener('input', function () {
        let isValid = /^\d{2}\/\m{2}\/\y{4}$/.test(dateInput.value);

        if (!isValid) {
            dateInput.setCustomValidity('Ungültiges Datumsformat. Verwende das Format dd/mm/yyyy.');
        } else {
            dateInput.setCustomValidity('');

            let parts = dateInput.value.split('/');
            let formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
            dateInput.value = formattedDate;
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
    if (clearButton) {
        clearButton.addEventListener('mouseover', function() {
            img.src = '/assets/img/icons/close-blue1.svg';
        });
        clearButton.addEventListener('mouseout', function() {
            img.src = '/assets/img/icons/close-black1.svg';
        });
    }

}


function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('assigned').value = '';
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('subtask-input').value = '';

    document.getElementById('assigned-list').classList.add('d-none');
    users = [];
    iniimg = [];
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
    generateAssignedButton();
}


async function createTask(boardcard) {
    let title = document.getElementById('title');
    let requiredTitle = document.getElementById('required-title');
    let requiredDate = document.getElementById('required-date');
    let requiredCategory = document.getElementById('required-category');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let priority = pushPrio();
    let category = document.getElementById('category');

    if (title.value && date.value && category.value) {
        
        loadTasks();
        pushToTodoBoard(priority, boardcard);
        await setItem('tasks', JSON.stringify(tasks));
        clearFields();
       
        let popup = document.getElementById('popup-add-task');
        
        if (popup !== null) {
            openInBoard();
            await updateProgressBar();
        } else {
            console.log('Popup wurde nicht gefunden / CREATE TASK');
            openToBoard();
        }
    } else {
        alert('Please fill up the required fields!');
        requiredTitle.classList.remove('d-none');
        requiredDate.classList.remove('d-none');
        requiredCategory.classList.remove('d-none');
        date.classList.add('inputfield-focus-red');
        title.classList.add('inputfield-focus-red');
        category.classList.add('inputfield-focus-red');
    }
    return tasks;
}

function pushToTodoBoard(priority, boardcard) {
    let newTask = {
        title: title.value,
        description: description.value,
        assigned: users,
        letter: iniimg,
        date: date.value,
        priority: priority,
        category: category.value,
        subtask: subtasks,
        checkoffs: [],
        status: boardcard
    };
    tasks.push(newTask);
}


function inputfieldFocus(field) {
    let input = document.getElementById(field);
    let required = document.getElementById(`required-${field}`);

    if (input) {
    if (document.activeElement === input) {
        if (input.value.trim() === '') {
            input.classList.add('inputfield-focus-red');
            required.classList.remove('d-none');
            input.classList.remove('inputfield-focus-blue');
            input.classList.remove('inputfield-focus-white');
        } else {
            input.classList.add('inputfield-focus-blue');
            required.classList.add('d-none');
            input.classList.remove('inputfield-focus-red');
            input.classList.remove('inputfield-focus-white');
        }
    } else {
        input.classList.remove('inputfield-focus-red');
        input.classList.remove('inputfield-focus-blue');
        input.classList.add('inputfield-focus-white');
        required.classList.add('d-none');
    }
    input.addEventListener('blur', function() {
        input.classList.remove('inputfield-focus-red');
        required.classList.add('d-none');
    });
    }
}


function openToBoard() {
    let popup = document.getElementById('popup-a-to-b');

    if (popup !== null) {
        
        setTimeout(() => {
            window.location.href = "/files/board.html";
        }, "1500");
        popup.classList.remove('d-none');
    } else {
        console.log('Popup wurde nicht gefunden / OPEN TO BOARD');
        window.location.href = "/files/board.html";
    }
}

function openInBoard() {
    let popup = document.getElementById('popup-a-to-b-board');

    if (popup !== null) {

        setTimeout(() => {
            window.location.href = "/files/board.html";
        }, "1500");
        popup.classList.remove('d-none');
    } else {
        console.log('Popup wurde nicht gefunden / OPEN IN BOARD');
        window.location.href = "/files/board.html";
    }
}
