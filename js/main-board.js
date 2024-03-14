// Load all Todos in Board

async function loadToDo() {                    
    await loadTasks();
    const [todo, progress, feedback, done] = initializeElements();
    clearBoardContents(todo, progress, feedback, done);

    const { hasToDo, hasProgress, hasFeedback, hasDone } = await populateBoards(todo, progress, feedback, done);
    updateDisplay(todo, progress, feedback, done, hasToDo, hasProgress, hasFeedback, hasDone);
}


function initializeElements() {
    let todo = document.getElementById('board-to-do');
    let progress = document.getElementById('board-in-progress');
    let feedback = document.getElementById('board-await-feedback');
    let done = document.getElementById('board-done');
    return [todo, progress, feedback, done];
}


function clearBoardContents(todo, progress, feedback, done) {
    todo.innerHTML = '';
    progress.innerHTML = '';
    feedback.innerHTML = '';
    done.innerHTML = '';
}


async function populateBoards(todo, progress, feedback, done) {
    const flags = { hasToDo: false, hasProgress: false, hasFeedback: false, hasDone: false };

    for (let i = 0; i < tasks.length; i++) {
        const taskValue = tasks[i];
        await updateBoard(taskValue, i, todo, progress, feedback, done, flags);
    }

    return flags;
}


async function updateBoard(taskValue, i, todo, progress, feedback, done, flags) {
    switch (taskValue.status) {
        case 'board-to-do':
            todo.innerHTML += generateBoardCard(taskValue, i);
            flags.hasToDo = true;
            break;
        case 'board-in-progress':
            progress.innerHTML += generateBoardCard(taskValue, i);
            flags.hasProgress = true;
            break;
        case 'board-await-feedback':
            feedback.innerHTML += generateBoardCard(taskValue, i);
            flags.hasFeedback = true;
            break;
        case 'board-done':
            done.innerHTML += generateBoardCard(taskValue, i);
            flags.hasDone = true;
            break;
    }
    checkCategoryButton();
    createUserButtons(taskValue, i);
    await updateProgressBar(i);
    notData();
    checkCategoryButton();
}


function updateDisplay(todo, progress, feedback, done, hasToDo, hasProgress, hasFeedback, hasDone) {
    if (!hasToDo) {
        todo.innerHTML = '<div id="NoToDo" class="Card_NotasksTodo" ondragstart="return false;" ondrop="return false;" disabled>No Tasks To do</div>';
    }
    if (!hasProgress) {
        progress.innerHTML = '<div id="NoProgress" class="Card_NotasksTodo" ondragstart="return false;" ondrop="return false;">Nothing in progress</div>';
    }
    if (!hasFeedback) {
        feedback.innerHTML = '<div id="NoProgress" class="Card_NotasksTodo" ondragstart="return false;" ondrop="return false;">No Feedback to give</div>';
    }
    if (!hasDone) {
        done.innerHTML = '<div id="NoToDoProgress" class="Card_NotasksTodo" ondragstart="return false;" ondrop="return false;">Nothing yet is done</div>';
    }
}


// Push all selected Subtasks

async function pushSelectedSubtask(i, k) {
    await loadTasks();

    const subtask = document.getElementById(`each-subtasks-${k}`);
    const task = tasks[i];

    if (subtask && task) {
        const value = subtask.getAttribute('value');

        updateCheckoffs(task, k, value);
        await saveTasks();
    }
}


function updateCheckoffs(task, k, value) {
    if (!Array.isArray(task.checkoffs)) {
        task.checkoffs = [];
    }

    if (value === 'selected') {
        addSubtaskToCheckoffs(task, k);
    } else {
        removeSubtaskFromCheckoffs(task, k);
    }
}


function addSubtaskToCheckoffs(task, k) {
    if (!task.checkoffs.includes(k)) {
        task.checkoffs.push(k);
    }
}


function removeSubtaskFromCheckoffs(task, k) {
    const index = task.checkoffs.indexOf(k);
    if (index !== -1) {
        task.checkoffs.splice(index, 1);
    }
}


async function saveTasks() {
    await setItem('tasks', JSON.stringify(tasks));
}


// open EditTask in Board

async function editTask(i) {
    await loadTasks();
    categoryArray = [];
    hidePopup(i);
    displayEditPopup();
    displayEditableContent(i);
    addEventFunctions();
}


function hidePopup(i) {
    let popup = document.getElementById('popup-add-task-div');
    let div = document.getElementById(`popup-add-task-edit`);
    let content = document.getElementById(`popup-add-task-content-edit`);
    document.getElementById('popup-add-task-content').innerHTML = '';
    popup.style.display = 'none';
    div.style.display = 'flex';
    content.style.display = 'flex';
    content.innerHTML = /*html*/`
        <img class="close-a-board edit-close-icon" src="../assets/img/icons/Close.svg" alt="" onclick="closePopupEdit(${i})">
        `;
}


function displayEditPopup() {
    let popup = document.getElementById('popup-add-task-div');
    let div = document.getElementById(`popup-add-task-edit`);
    let content = document.getElementById(`popup-add-task-content-edit`);
    popup.style.display = 'none';
    div.style.display = 'flex';
    content.style.display = 'flex';
}


function displayEditableContent(i) {
    let content = document.getElementById(`popup-add-task-content-edit`);
    content.innerHTML += generateEditableAddtask(i);
    pushValueToEdit(i);

    let subtaskList = document.getElementById('subtasks');
    let assignedButton = document.getElementById('assigned-button');
    let subtaskLabel = document.getElementById('subtasks-label');

    subtaskList.classList.add('no-scrollbar');
    assignedButton.classList.add('position-assigned-btn');
    subtaskLabel.classList.add('subtasks-label');
}


// Push all values to the inputfields

async function pushValueToEdit(i) {
    await loadTasks();
    let array = tasks[i];
    updateFields(array);
    updateSubtasks(array);
    tasks.splice(i, 1);
}


function updateFields(array) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let dateValue = deformatDate(array.date);
    categoryArray.push(array.category);
    title.value = array.title;
    description.value = array.description;
    date.value = dateValue;
    let priority = array.priority;
    getPriority(priority);
}


function updateSubtasks(array) {
    let subtasksArray = array.subtask;
    subtasks.push(subtasksArray);

    subtasks = [];
    for (let j = 0; j < subtasksArray.length; j++) {
        subtasks.push(subtasksArray[j]);
    }
    getSubtasks();
}


// save the edited task

async function saveEditedTask(i) {
    await loadTasks();
    checkCategoryButton();
    let isValid = validateForm();
    if (isValid) {
        let newTask = createNewTask(i);
        updateTaskList(newTask, i);
        await saveTasks();
        closeEditPopup();
        await updateProgressBar(i);
    } else {
        handleInvalidForm();
    }
    await reloadTasks();
}


function validateForm() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let requiredTitle = document.getElementById('required-title');
    let requiredDate = document.getElementById('required-date');

    if (!title.value || !date.value) {
        requiredTitle.classList.remove('d-none');
        requiredDate.classList.remove('d-none');
        date.classList.add('inputfield-focus-red');
        title.classList.add('inputfield-focus-red');
        return false;
    }
    return true;
}


function createNewTask(i) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let priority = pushPrio();
    let dateValue = date.value;
    let formatedDate = formatDate(dateValue);

    let newTask = {
        title: title.value,
        description: description.value,
        assigned: users,
        letter: iniimg,
        date: formatedDate,
        priority: priority,
        category: categoryArray[0],
        subtask: subtasks,
        checkoffs: tasks[i].checkoffs,
        status: tasks[i].status
    };
    return newTask;
}


function updateTaskList(newTask, i) {
    tasks.push(newTask);
    tasks.splice(i, 1);
}


async function saveTasks() {
    await setItem('tasks', JSON.stringify(tasks));
}


function closeEditPopup() {
    let popup = document.getElementById('popup-add-task');
    if (popup !== null) {
        document.getElementById('popup-add-task-edit').style.display = 'none';
        document.getElementById(`popup-add-task-content-edit`).innerHTML = '';
    } else {
        console.log('Popup wurde nicht gefunden / SAVE EDIT');
    }
}


function handleInvalidForm() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let requiredTitle = document.getElementById('required-title');
    let requiredDate = document.getElementById('required-date');

    requiredTitle.classList.remove('d-none');
    requiredDate.classList.remove('d-none');
    date.classList.add('inputfield-focus-red');
    title.classList.add('inputfield-focus-red');
}


async function reloadTasks() {
    loadTasks();
    await loadToDo();
    categoryArray = [];
}

