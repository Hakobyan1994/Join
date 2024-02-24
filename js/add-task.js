let tasks = [];
let subtasks = [];
let users = [];
let iniimg = [];


function renderAddTask() {
    let content = document.getElementById('add-task');
    let boardcard = 'board-to-do';
    content.innerHTML = generateRenderAddTask(boardcard);
    addEventFunctions();
    addSubtask();
}


async function addEventFunctions() {
    await loadContacts();
    await loadTasks();
    getPrio();
    document.getElementById('prio').addEventListener('click', getPrio);
    clearButtonImgChange();
    setupSubtaskInputFocus();
    setupSubtaskInputFocus();
    enterOnSubtask();
    inputfieldFocus();
    loadSelectedPage();
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
    renderContactList(list);
    hideAssignedButton();
}


function renderContactList(list) {
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
            </div>`;    
    }
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

    let dateValue = date.value;
    let formatedDate = formatDate(dateValue);

    if (title.value && date.value && category.value) {
        
        loadTasks();
        pushToTodoBoard(priority, boardcard, description, formatedDate);
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


function pushToTodoBoard(priority, boardcard, description, formatedDate) {
    let newTask = {
        title: title.value,
        description: description.value,
        assigned: users,
        letter: iniimg,
        date: formatedDate,
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