let tasks = [];
let subtasks = [];
let users = [];
let iniimg = [];

async function renderAddTaskMain() {
    let content = document.getElementById('render-add-task');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainAddTask();
    renderAddTask();
    await loadContacts();
    document.getElementById('date').min = minDate();
    document.getElementById('date').value = minDate();
}

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
    closeList('assigned-list', 'assigned');
    closeList('category-list', 'category');
}


function renderAssignedList() {
    let list = document.getElementById('assigned-list');
    let assignedButton = document.getElementById('assigned-button');
    let input = document.getElementById('assigned');
    list.classList.toggle('d-none');
    if(!list.classList.contains('d-none')) {
        assignedButton.classList.add('d-none');
        input.placeholder = '';
    } else {
        assignedButton.classList.remove('d-none');
        input.placeholder = 'Select contacts to assign';
    }
    list.innerHTML = '';
    renderContactList(list);
}


function renderContactList(list) {
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i].name;
        const img = contacts[i].initials;
        const userIndex = users.indexOf(name);
        const isSelected = userIndex !== -1;
        list.innerHTML += generateHtmlAssignedList(name, img, isSelected, i);
    }
}


function searchAssignedList() {
    let input = document.getElementById('assigned');
    let filter = input.value.toUpperCase();
    for (let i = 0; i < contacts.length; i++) {
        let list = document.getElementById(`assigned-contacts-${i}`);
        let array = contacts[i].name;
        let name = array.toUpperCase();
        if (name.indexOf(filter) > -1) {
            list.style.display = 'flex';
        } else {
            list.style.display = 'none';
        }
    }
}


function selectCategory(category, exCategory) {
    let selectedCategory = document.getElementById(category);
    let notSelected = document.getElementById(exCategory);
    let input = document.getElementById('category');

    if (category === 'technical') {
        styleCategoryList(selectedCategory, notSelected, input);
    }
    else if (category === 'story') {
        styleCategoryList(selectedCategory, notSelected, input);
    }
    pushCategorytoInput();
    inputfieldFocus('category');
}


function styleCategoryList(selectedCategory, notSelected, input) {
    selectedCategory.classList.toggle('grey');
    selectedCategory.classList.toggle('white-bg');
    notSelected.classList.remove('grey');
    notSelected.classList.remove('white-bg');
    input.focus();
}


function pushCategorytoInput() {
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
    document.getElementById('assigned-button').classList.add('d-none');
    let contact = document.getElementById(`assigned-contacts-${i}`);
    let checkbox = document.getElementById(`checkbox-contact-${i}`);
    contact.classList.toggle('select-contact-blue');
    contact.classList.toggle('white');
    selectBehaviorAssignedContacts(contact, checkbox);
    pushUser(i);
    generateAssignedButton();
}


function selectBehaviorAssignedContacts(contact, checkbox) {
    if (contact.classList.contains('select-contact-blue')) {
        checkbox.src = '../assets/img/icons/selected1.svg';
        checkbox.classList.remove('checkbox-none-selected');
        checkbox.classList.add('checkbox-selected');
    } else {
        checkbox.src = '../assets/img/icons/none-selected1.svg';
        checkbox.classList.add('checkbox-none-selected');
        checkbox.classList.remove('checkbox-selected');
    }
}


function pushUser(i) {
    let assignedContact = document.getElementById(`assigned-contacts-${i}`);
    let approved = assignedContact.classList.contains('select-contact-blue');
    let user = contacts[i].name;
    let img = contacts[i].initials;
    let index = users.indexOf(user);
    if (approved) {
        addDetectedContacts(index, user, img);
    } else {
        deleteNotDetectedContacts(index);
    }
    generateAssignedButton();
}


function addDetectedContacts(index, user, img) {
    if (index === -1) {
        users.push(user);
        iniimg.push(img);
    }
}


function deleteNotDetectedContacts(index) {
    if (index !== -1) {
        users.splice(index, 1);
        iniimg.splice(index, 1);
    }
}


function pushPrio() {
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');
    let selectedPriority = null;

    prioButtons.forEach(function (button) {
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

    prioButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            stylingPrioButtons(button, prioButtons);
        });
    });
}


function stylingPrioButtons(button, prioButtons) {
    if (!button.classList.contains('prio-notselected')) {
        button.classList.add('prio-notselected')
    } else {
        prioButtons.forEach(function (btn) {
            btn.classList.remove('prio-notselected');
            btn.classList.add('prio-notselected');
        });
        button.classList.add('prio-notselected');
        button.classList.remove('prio-notselected');
    }
}


function handleFocus(add, closeCheck) {
    add.classList.add('d-none');
    closeCheck.classList.remove('d-none');
}

function handleBlur(add, closeCheck) {
    add.classList.remove('d-none');
    closeCheck.classList.add('d-none');
}

function handleInput(subtask, add, closeCheck) {
    if (subtask.value.trim() !== '') {
        handleFocus(add, closeCheck);
    }
}

function handleBlurEvent(subtask, add, closeCheck) {
    if (subtask.value.trim() !== '') {
        handleFocus(add, closeCheck);
    } else {
        handleBlur(add, closeCheck);
    }
}


function setupSubtaskInputFocus() {
    let subtask = document.getElementById('subtask-input');
    let add = document.getElementById('subtask-change-add-icon');
    let closeCheck = document.getElementById('subtask-close-check-icon');

    subtask.addEventListener('focus', () => handleFocus(add, closeCheck));
    subtask.addEventListener('blur', () => handleBlurEvent(subtask, add, closeCheck));
    subtask.addEventListener('input', () => handleInput(subtask, add, closeCheck));
}


function enterOnSubtask() {
    let input = document.getElementById('subtask-input');

    input.addEventListener('keypress', function (event) {
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

    pushSubtask(subtask);
    updateSubtaskList(list);
    clearInput(content);
}

function pushSubtask(subtask) {
    subtasks.push(subtask);
}


function clearInput(content) {
    content.value = '';
}


function editSubtask(i) {
    let subtaskInput = document.getElementById(`subtask${i}`);
    let listItem = document.getElementById(`each-subtask${i}`);
    let inputValue = subtaskInput.innerText || subtaskInput.textContent;

    makeListItemEditable(listItem, i, inputValue);
}


function makeListItemEditable(listItem, i, inputValue) {
    listItem.classList.add('editable-each');
    listItem.innerHTML = createEditableSubtaskElement(i, inputValue);
}


function deleteSubtask(i) {
    let position = i;
    subtasks.splice(position, 1);

    let list = document.getElementById('subtasks');
    list.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += generateSubtaskElement(i, text);
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

    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += generateSubtaskElement(i, text);
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
        clearButton.addEventListener('mouseover', function () {
            img.src = '../assets/img/icons/close-blue1.svg';
        });
        clearButton.addEventListener('mouseout', function () {
            img.src = '../assets/img/icons/close-black1.svg';
        });
    }
}


function clearFields() {
    resetFieldValues();
    hideAssignedList();
    resetGlobalVariables();
    updateSubtasklist();
    resetPrioritySelection();
    generateAssignedButton();
}

function resetFieldValues() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('assigned').value = '';
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('subtask-input').value = '';
}

function hideAssignedList() {
    document.getElementById('assigned-list').classList.add('d-none');
}

function resetGlobalVariables() {
    users = [];
    iniimg = [];
    subtasks = [];
}

function resetPrioritySelection() {
    let prio = document.querySelectorAll('.prio');
    let medium = document.getElementById('medium');
    prio.forEach(function (button) {
        if (!button.classList.contains('prio-notselected')) {
            button.classList.add('prio-notselected');
            medium.classList.remove('prio-notselected');
        }
    });
}


async function createTask(boardcard) {
    let { title, requiredTitle, requiredDate, requiredCategory, description, date, category } = getInputElements();
    let dateValue = date.value;
    let formatedDate = formatDate(dateValue);
    if (isValidInput(title.value, dateValue, category.value)) {
        await handleValidInput(boardcard, description, formatedDate);
    } else {
        handleInvalidInput(requiredTitle, requiredDate, requiredCategory, date, title, category);
    }
    if (document.getElementById('popup-add-task')) {
        loadToDo();
        let content = document.getElementById('popup-add-task-content');
    }
    return tasks;
}

function getInputElements() {
    return {
        title: document.getElementById('title'),
        requiredTitle: document.getElementById('required-title'),
        requiredDate: document.getElementById('required-date'),
        requiredCategory: document.getElementById('required-category'),
        description: document.getElementById('description'),
        date: document.getElementById('date'),
        category: document.getElementById('category')
    };
}

function isValidInput(titleValue, dateValue, categoryValue) {
    return titleValue && dateValue && categoryValue;
}

async function handleValidInput(boardcard, description, formatedDate) {
    loadTasks();
    pushToTodoBoard(boardcard, description, formatedDate);
    await setItem('tasks', JSON.stringify(tasks));
    clearFields();
    openBoard();
    
}

function handleInvalidInput(requiredTitle, requiredDate, requiredCategory, date, title, category) {
    requiredTitle.classList.remove('d-none');
    requiredDate.classList.remove('d-none');
    requiredCategory.classList.remove('d-none');
    date.classList.add('inputfield-focus-red');
    title.classList.add('inputfield-focus-red');
    category.classList.add('inputfield-focus-red');
}

function pushToTodoBoard(boardcard, description, formatedDate) {
    let { title, category } = getInputElements();
    let priority = pushPrio();
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
            handleFocusedInput(input, required);
        } else {
            handleBlurredInput(input, required);
        }

        input.addEventListener('blur', function () {
            handleBlurredInput(input, required);
        });
    }
}

function handleFocusedInput(input, required) {
    let isInputEmpty = input.value.trim() === '';
    input.classList.toggle('inputfield-focus-red', isInputEmpty);
    input.classList.toggle('inputfield-focus-blue', !isInputEmpty);
    required.classList.toggle('d-none', !isInputEmpty);
    input.classList.toggle('inputfield-focus-white', false);
}

function handleBlurredInput(input, required) {
    input.classList.remove('inputfield-focus-red', 'inputfield-focus-blue');
    input.classList.add('inputfield-focus-white');
    required.classList.add('d-none');
}



function openBoard() {
    let addTask = document.getElementById('popup-a-to-b');
    let board = document.getElementById('popup-a-to-b-board');
    if(addTask) {
        addTask.classList.remove('d-none');
    } else if(board) {
        board.classList.remove('d-none');
    }
    setTimeout(() => {
        renderPage('board-page', 'render-board');
    }, "1500");
}


function closeList(id, eId) {
    let list = document.getElementById(id);
    let eIdElement = document.getElementById(eId);
    let assignedButton = document.getElementById('assigned-button');
    if(list){

    document.addEventListener('click', function(event) {

        if (!list.contains(event.target) && event.target !== eIdElement) {
            list.classList.add('d-none');
            if(id === 'assigned-list') {
                eIdElement.value = '';
                eIdElement.placeholder = 'Select contacts to assign';
                if(assignedButton) {
                    assignedButton.classList.remove('d-none');
                } else {
                    console.log('ID: assigned-button not found');
                }

            }
        } else {
            list.classList.add('block');
        }
    });
    }
}    


function btnRenderAssignedList() {
    let list = document.getElementById('assigned-list');
    let button = document.getElementById('assigned-button');
    list.classList.remove('d-none');
    button.classList.add('d-none');
}