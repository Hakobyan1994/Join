// Load all Todos in Board
let array = [];


/**
 * Loads tasks into the respective boards (To Do, In Progress, Awaiting Feedback, Done) based on their status,
 * and updates the display accordingly.
 */
async function loadToDo() {              
    await loadTasks();
    const [todo, progress, feedback, done] = initializeElements();
    clearBoardContents(todo, progress, feedback, done);

    const { hasToDo, hasProgress, hasFeedback, hasDone } = await populateBoards(todo, progress, feedback, done);
    updateDisplay(todo, progress, feedback, done, hasToDo, hasProgress, hasFeedback, hasDone);
}


/**
 * Initializes the board elements by retrieving them from the DOM.
 * 
 * @returns {Array<Element>} An array containing the board elements for To Do, In Progress, Awaiting Feedback, and Done.
 */
function initializeElements() {
    let todo = document.getElementById('board-to-do');
    let progress = document.getElementById('board-in-progress');
    let feedback = document.getElementById('board-await-feedback');
    let done = document.getElementById('board-done');
    return [todo, progress, feedback, done];
}


/**
 * Clears the contents of the board elements by setting their inner HTML to an empty string.
 * 
 * @param {Element} todo - The element representing the To Do board.
 * @param {Element} progress - The element representing the In Progress board.
 * @param {Element} feedback - The element representing the Awaiting Feedback board.
 * @param {Element} done - The element representing the Done board.
 */
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


/**
 * Populates the boards with tasks based on the tasks array.
 * 
 * @param {Element} todo - The element representing the To Do board.
 * @param {Element} progress - The element representing the In Progress board.
 * @param {Element} feedback - The element representing the Awaiting Feedback board.
 * @param {Element} done - The element representing the Done board.
 * @returns {Object} An object containing flags indicating whether each board has tasks.
 */
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
    updateBoardCard(taskValue, i);
}


/**
 * Updates the card for a specific task on the board.
 * 
 * @param {Object} taskValue - The task object containing details of the task.
 * @param {number} i - The index of the task in the tasks array.
 */
async function updateBoardCard(taskValue, i) {
    checkCategoryButton();
    createUserButtons(taskValue, i);
    await updateProgressBar(i);
    checkCategoryButton();
    highlightProgressbar(i);
    emptyProgressBar(i);
}


/**
 * Updates the display of each board based on whether they have tasks or not.
 * 
 * @param {HTMLElement} todo - The DOM element representing the "To Do" board.
 * @param {HTMLElement} progress - The DOM element representing the "In Progress" board.
 * @param {HTMLElement} feedback - The DOM element representing the "Await Feedback" board.
 * @param {HTMLElement} done - The DOM element representing the "Done" board.
 * @param {boolean} hasToDo - Indicates if the "To Do" board has tasks.
 * @param {boolean} hasProgress - Indicates if the "In Progress" board has tasks.
 * @param {boolean} hasFeedback - Indicates if the "Await Feedback" board has tasks.
 * @param {boolean} hasDone - Indicates if the "Done" board has tasks.
 */
function updateDisplay(todo, progress, feedback, done, hasToDo, hasProgress, hasFeedback, hasDone) {
    if (!hasToDo) {
        todo.innerHTML = '<div id="NoToDo" class="Card_NotasksTodo" ondragstart="return false;" ondrop="return false;" ondragover="return false;" disabled ontouchend="return false;" ontouchmove="return false;">No Tasks To do</div>';
    }
    if (!hasProgress) {
        progress.innerHTML = '<div id="NoProgress" class="Card_NotasksTodo" ondragstart="return false;" ondrop="return false;" ondragover="return false;" disabled ontouchend="return false;" ontouchmove="return false;">Nothing in progress</div>';
    }
    if (!hasFeedback) {
        feedback.innerHTML = '<div id="NoFeedback" class="Card_NotasksTodo" ondragstart="return false;" ondrop="return false;" ondragover="return false;" disabled ontouchend="return false;" ontouchmove="return false;">No Feedback to give</div>';
    }
    if (!hasDone) {
        done.innerHTML = '<div id="NoDone" class="Card_NotasksTodo" ondragstart="return false;" ondrop="return false;" ondragover="return false;" disabled ontouchend="return false;" ontouchmove="return false;">Nothing yet is done</div>';
    }
}


/**
 * Pushes the selected subtask to the task's checkoffs array.
 * 
 * @param {number} i - The index of the task in the tasks array.
 * @param {number} k - The index of the subtask in the task's subtask array.
 */
async function pushSelectedSubtask(i, k) {
    await loadTasks();

    let subtask = document.getElementById(`each-subtasks-${k}`);
    let task = tasks[i];

    if (subtask && task) {
        const value = subtask.getAttribute('value');

        updateCheckoffs(task, k, value);
        await saveTasks();
    }
}


/**
 * Updates the checkoffs array of a task based on the value of the subtask.
 * 
 * @param {object} task - The task object.
 * @param {number} k - The index of the subtask in the task's subtask array.
 * @param {string} value - The value indicating if the subtask is selected or not.
 */

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


/**
 * Adds the index of a subtask to the task's checkoffs array if it's not already included.
 * 
 * @param {object} task - The task object.
 * @param {number} k - The index of the subtask in the task's subtask array.
 */
function addSubtaskToCheckoffs(task, k) {
    if (!task.checkoffs.includes(k)) {
        task.checkoffs.push(k);
    }
}


/**
 * Removes the index of a subtask from the task's checkoffs array if it's included.
 * 
 * @param {object} task - The task object.
 * @param {number} k - The index of the subtask in the task's subtask array.
 */
function removeSubtaskFromCheckoffs(task, k) {
    const index = task.checkoffs.indexOf(k);
    if (index !== -1) {
        task.checkoffs.splice(index, 1);
    }
}


/**
 * Saves the tasks array to local storage.
 */
async function saveTasks() {
    await setItem('tasks', JSON.stringify(tasks));
}


/**
* Handles the editing of a task.
*
* @param {number} i - The index of the task to be edited.
*/
async function editTask(i) {
    await loadTasks();
    categoryArray = [];
    users = [];
    iniimg = [];
    hidePopup(i);
    displayEditPopup();
    displayEditableContent(i);
    addEventFunctions();
}


/**
 * Hides the popup for adding a task and shows the popup for editing a task.
 * 
 * @param {number} i - The index of the task being edited.
 */
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


/**
 * Displays the edit popup for editing a task.
 */
function displayEditPopup() {
    let popup = document.getElementById('popup-add-task-div');
    let div = document.getElementById(`popup-add-task-edit`);
    let content = document.getElementById(`popup-add-task-content-edit`);
    popup.style.display = 'none';
    div.style.display = 'flex';
    content.style.display = 'flex';
}


/**
 * Displays the editable content for the task being edited.
 * 
 * @param {number} i - The index of the task being edited.
 */
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


/**
 * Pushes the values of the task to be edited to the edit form.
 * 
 * @param {number} i - The index of the task to be edited.
 */
async function pushValueToEdit(i) {
    await loadTasks();
    array = tasks[i];
    updateFields(array);
    updateContactList(array);
    updateSubtasks(array);
    tasks.splice(i, 1);
}


/**
 * Updates the input fields of the edit form with the task values.
 * 
 * @param {Object} array - The task object containing the values.
 */
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


/**
 * Updates the assigned contact list in the edit form with the task's assigned contacts.
 * 
 * @param {Object} array - The task object containing the assigned contacts.
 */
function updateContactList(array) {
    renderAssignedList();
    for (let i = 0; i < array.assigned.length; i++) {
        let selectedContacts = array.assigned[i];
        for (let k = 0; k < contacts.length; k++) {
            let contact = document.getElementById(`contact-name-${k}`);
            if(selectedContacts.toUpperCase() === contact.textContent.toUpperCase()) {
                selectAssignedContacts(k);
            } 
        }
    }
}


/**
 * Updates the subtasks in the edit form with the task's subtasks.
 * 
 * @param {Object} array - The task object containing the subtasks.
 */
function updateSubtasks(array) {
    let subtasksArray = array.subtask;
    let checkoffsArray = array.checkoffs;
    subtasks.push(subtasksArray);
    checkoffs.push(checkoffsArray)
    subtasks = [];
    checkoffs = [];
    for (let j = 0; j < subtasksArray.length; j++) {
        subtasks.push(subtasksArray[j]);
    }
    for (let k = 0; k < checkoffsArray.length; k++) {
        checkoffs.push(checkoffsArray[k]);
    }
    getSubtasks();
}


/**
 * Saves the edited task after validation and updates the task list.
 * 
 * @param {number} i - The index of the task being edited.
 */
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


/**
 * Validates the form by checking if the required fields are filled.
 * 
 * @returns {boolean} - Returns true if the form is valid, otherwise false.
 */
function validateForm() {
    let title = document.getElementById('title');
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


/**
 * Creates a new task object based on the form values.
 * 
 * @param {number} i - The index of the task being edited.
 * @returns {Object} - Returns the new task object.
 */
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
        checkoffs: checkoffs,
        status: tasks[i].status
    };
    return newTask;
}


/**
 * Updates the task list by adding the new task and removing the edited task.
 * 
 * @param {Object} newTask - The new task object.
 * @param {number} i - The index of the task being edited.
 */
function updateTaskList(newTask, i) {
    tasks.push(newTask);
    tasks.splice(i, 1);
}


/**
 * Saves the tasks array to the local storage.
 */
async function saveTasks() {
    await setItem('tasks', JSON.stringify(tasks));
}


/**
 * Closes the edit popup after saving the edited task.
 */
function closeEditPopup() {
    let popup = document.getElementById('popup-add-task');
    if (popup !== null) {
        document.getElementById('popup-add-task-edit').style.display = 'none';
        document.getElementById(`popup-add-task-content-edit`).innerHTML = '';
    }
}


/**
 * Handles the case when the form is invalid by displaying error messages.
 */
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


/**
 * Reloads tasks and updates the task board.
 */
async function reloadTasks() {
    loadTasks();
    await loadToDo();
    categoryArray = [];
}