let selectedUserId = [];
let selectedNamesFormat = []

/**
 * Pushes selected or deselected user to the user list.
 * 
 * @param {number} i - The index of the selected or deselected contact.
 */
async function pushUser(i) {
    await getAllContacts();
    const contactId = contacts[i].id;
    const selectedUser = contacts[i].name;
    let img = contacts[i].initials;
    let index = users.indexOf(selectedUser);
    const approved = document.getElementById(`assigned-contacts-${i}`).classList.contains('select-contact-blue');
    if (approved) {
        if (!selectedNamesFormat.includes(selectedUser)) {
            selectedNamesFormat.push(selectedUser)
        }
        if (!selectedUserId.includes(contactId) && !selectedUserId.includes(contactId)) {
            selectedUserId.push(contactId);
            addDetectedContacts(index, selectedUser, img);
        }
    } else {
        selectedUserId = selectedUserId.filter(id => id !== contactId);
        selectedNamesFormat = selectedNamesFormat.filter(name => name !== selectedUser)
        deleteNotDetectedContacts(index);
    }
    generateAssignedButton();
}

/**
 * Adds the selected user to the user list if not already present.
 * 
 * @param {number} index - The index of the selected user in the user list.
 * @param {string} selectedUser - The name of the selected user.
 * @param {string} img - The initials image of the selected user.
 */
function addDetectedContacts(index, selectedUser, img) {
    if (index === -1) {
        users.push(selectedUser);
        iniimg.push(img);
    }
}

/**
 * Deletes the deselected user from the user list.
 * 
 * @param {number} index - The index of the deselected user in the user list.
 */
function deleteNotDetectedContacts(index) {
    if (index !== -1) {
        users.splice(index, 1);
        iniimg.splice(index, 1);
    }
}

/**
 * Pushes the selected priority.
 * 
 * @returns {string} The selected priority ('high', 'medium', or 'low').
 */
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


/**
 * Adds a new subtask.
 */
function addSubtask() {
    let content = document.getElementById('subtask-input');
    let list = document.getElementById('subtasks');
    let subtaskValue = content.value;
    list.innerHTML = '';
    if (subtaskValue.trim() === '') {
        updateSubtasklist();
        return;
    }
    pushSubtask(subtaskValue);
    updateSubtaskList(list);
    clearInput(content);
}


/**
 * Pushes a new subtask to the subtasks array.
 * 
 * @param {string} subtaskValue - The content of the new subtask to be added.
 */
function pushSubtask(subtaskValue) {
    subtasks.push(subtaskValue);
}


/**
 * Clears the input field.
 * 
 * @param {HTMLElement} content - The input field element to be cleared.
 */
function clearInput(content) {
    content.value = '';
}


/**
 * Creates a new task.
 * 
 * @param {HTMLElement} boardcard - The board card element to which the task will be added.
 * @returns {Promise<Array>} - A promise that resolves to the updated tasks array.
 */
async function createTask(boardcard) {
    checkUserstatus();
    let priority = pushPrio();
    let { title, requiredTitle, requiredDate, requiredCategory, description, date, category } = getInputElements();
    let dateValue = date.value;
    if (isValidInput(title.value, dateValue, category.value)) {
        // await handleValidInput(boardcard, description, formatedDate);
        const url = 'https://api.my-join-app.com/join_app/create_tasks/'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                assignedTo_ids: selectedUserId ? selectedUserId : [],
                date: dateValue,
                prio: priority,
                category: category.value,
                subtasks: subtasks || [],
                status: boardcard,
                checkoffs: []
            })
        })
        if (response.ok) {
            const data = await response.json();
            tasks = data
        }
        if (boardcard === 'board-to-do') {
            document.getElementById('board-page').click()
            closePopupAddTask();
            return
        } 
        closePopupAddTask();
        await renderBoardMain();
    }
    else {
        handleInvalidInput(requiredTitle, requiredDate, requiredCategory, date, title, category);
    }
}


function checkUserstatus() {
    if (authToken === null && asguest === null) {
        const color = 'red';
        const fontSize = '16px'
        const infoTextChange = document.getElementById('information-text');
        infoTextChange.innerText = 'you should be logged in'
        infoTextChange.style.color = color;
        infoTextChange.style.fontSize = fontSize;
        return
    }
}


/**
 * Retrieves input elements from the DOM.
 * 
 * @returns {Object} An object containing references to various input elements.
 */
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


/**
 * Checks if the input values are valid.
 * 
 * @param {string} titleValue - The value of the title input.
 * @param {string} dateValue - The value of the date input.
 * @param {string} categoryValue - The value of the category input.
 * @returns {boolean} - true if all input values are valid, otherwise false.
 */
function isValidInput(titleValue, dateValue, categoryValue) {
    return titleValue && dateValue && categoryValue;
}


/**
 * Handles the task creation process for valid input.
 * 
 * @param {HTMLElement} boardcard - The board card element to which the task will be added.
 * @param {HTMLElement} description - The description input element.
 * @param {string} formatedDate - The formatted date string.
 */
async function handleValidInput(boardcard, description, formatedDate) {
    // await getAll()
    await loadTasks();
    // pushToTodoBoard(boardcard, description, formatedDate);
    // await setItem('tasks', JSON.stringify(tasks));
    clearFields();
    openBoard();

}


/**
 * Handles the UI changes for invalid input.
 * 
 * @param {HTMLElement} requiredTitle - The required title indicator element.
 * @param {HTMLElement} requiredDate - The required date indicator element.
 * @param {HTMLElement} requiredCategory - The required category indicator element.
 * @param {HTMLElement} date - The date input element.
 * @param {HTMLElement} title - The title input element.
 * @param {HTMLElement} category - The category input element.
 */
function handleInvalidInput(requiredTitle, requiredDate, requiredCategory, date, title, category) {
    requiredTitle.classList.remove('d-none');
    requiredDate.classList.remove('d-none');
    requiredCategory.classList.remove('d-none');
    date.classList.add('inputfield-focus-red');
    title.classList.add('inputfield-focus-red');
    category.classList.add('inputfield-focus-red');
}


/**
 * Pushes the new task to the To-Do board.
 * 
 * @param {HTMLElement} boardcard - The board card element to which the task will be added.
 * @param {HTMLElement} description - The description input element.
 * @param {string} formatedDate - The formatted date string.
 */
