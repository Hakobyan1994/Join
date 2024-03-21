function pushUser(i) {                                                              // push all contacts 
    let assignedContact = document.getElementById(`assigned-contacts-${i}`);
    let approved = assignedContact.classList.contains('select-contact-blue');
    let selectedUser = contacts[i].name;
    let img = contacts[i].initials;
    let index = users.indexOf(selectedUser);
    if (approved) {
        addDetectedContacts(index, selectedUser, img);
    } else {
        deleteNotDetectedContacts(index);
    }
    generateAssignedButton();
}


function addDetectedContacts(index, selectedUser, img) {
    if (index === -1) {
        users.push(selectedUser);
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


function pushSubtask(subtaskValue) {
    subtasks.push(subtaskValue);
}


function clearInput(content) {
    content.value = '';
}


async function createTask(boardcard) { 
    removeZindex();                                    // create Task to board
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
    await loadTasks();
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

