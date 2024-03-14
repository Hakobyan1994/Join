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
    let hasToDo = false;
    let hasProgress = false;
    let hasFeedback = false;
    let hasDone = false;

    for (let i = 0; i < tasks.length; i++) {
        let taskValue = tasks[i];
        switch (taskValue.status) {
            case 'board-to-do':
                todo.innerHTML += generateBoardCard(taskValue, i);
                hasToDo = true;
                break;
            case 'board-in-progress':
                progress.innerHTML += generateBoardCard(taskValue, i);
                hasProgress = true;
                break;
            case 'board-await-feedback':
                feedback.innerHTML += generateBoardCard(taskValue, i);
                hasFeedback = true;
                break;
            case 'board-done':
                done.innerHTML += generateBoardCard(taskValue, i);
                hasDone = true;
                break;
        }
        checkCategoryButton();
        createUserButtons(taskValue, i);
        await updateProgressBar(i);
        notData();
        checkCategoryButton();
    }

    return { hasToDo, hasProgress, hasFeedback, hasDone };
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

/////////////
async function editTask(i) {
    await loadTasks();
    categoryArray = [];
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
    content.innerHTML += generateEditableAddtask(i);
    addEventFunctions();
    pushValueToEdit(i);

    let subtaskList = document.getElementById('subtasks');
    let assignedButton = document.getElementById('assigned-button');
    let subtaskLabel = document.getElementById('subtasks-label');

    subtaskList.classList.add('no-scrollbar');
    assignedButton.classList.add('position-assigned-btn');
    subtaskLabel.classList.add('subtasks-label');
}


async function pushValueToEdit(i) {
    await loadTasks();
    let array = tasks[i];
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let dateValue = deformatDate(array.date);
    categoryArray.push(tasks[i].category);
    title.value = array.title;
    description.value = array.description;
    date.value = dateValue;
    let priority = array.priority;
    getPriority(priority);
    let subtasksArray = array.subtask;
    subtasks.push(subtasksArray);

    subtasks = [];
    for (let j = 0; j < subtasksArray.length; j++) {
        subtasks.push(subtasksArray[j]);
    }
    getSubtasks();
    tasks.splice(i, 1);
}


async function saveEditedTask(i) {
    await loadTasks();
    checkCategoryButton();
    let title = document.getElementById('title');
    let requiredTitle = document.getElementById('required-title');
    let requiredDate = document.getElementById('required-date');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let priority = pushPrio();

    let dateValue = date.value;
    let formatedDate = formatDate(dateValue);

    if (title.value && date.value) {

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

        tasks.push(newTask);
        tasks.splice(i, 1);

        await setItem('tasks', JSON.stringify(tasks));

        let popup = document.getElementById('popup-add-task');
        document.getElementById('popup-add-task-edit').style.display = 'none';
        document.getElementById(`popup-add-task-content-edit`).innerHTML = '';

        if (popup !== null) {
            await updateProgressBar(i);
        } else {
            console.log('Popup wurde nicht gefunden / SAVE EDIT');
        }
    } else {
        requiredTitle.classList.remove('d-none');
        requiredDate.classList.remove('d-none');
        date.classList.add('inputfield-focus-red');
        title.classList.add('inputfield-focus-red');
    }
    loadTasks();
    await loadToDo();
    categoryArray = [];
}
