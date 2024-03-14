let dataTask = [];
let categoryArray = [];

async function renderBoardMain() {
    let content = document.getElementById('render-board');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainBoard();
    emptyPages();
    loadToDo();
    await loadContacts();
    await loadTasks();
}


async function loadToDo() {
    await loadTasks();
    let todo = document.getElementById('board-to-do');
    let progress = document.getElementById('board-in-progress');
    let feedback = document.getElementById('board-await-feedback');
    let done = document.getElementById('board-done');
    todo.innerHTML = '';
    progress.innerHTML = '';
    feedback.innerHTML = '';
    done.innerHTML = '';

    let hasToDo = false;
    let hasProgress = false;
    let hasFeedback = false;
    let hasDone = false;

    for (let i = 0; i < tasks.length; i++) {
        let taskValue = tasks[i];
        if (taskValue.status === 'board-to-do') {
            todo.innerHTML += generateBoardCard(taskValue, i);
            hasToDo = true;
        }
        if (taskValue.status === 'board-in-progress') {
            progress.innerHTML += generateBoardCard(taskValue, i);
            hasProgress = true;
        }
        if (taskValue.status === 'board-await-feedback') {
            feedback.innerHTML += generateBoardCard(taskValue, i);
            hasFeedback = true;
        }
        if (taskValue.status === 'board-done') {
            done.innerHTML += generateBoardCard(taskValue, i);
            hasDone = true;
        }
        checkCategoryButton();
        createUserButtons(taskValue, i);
        await updateProgressBar(i);
        notData();
        checkCategoryButton();
    }
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

function emptyPages() {
    document.getElementById('popup-add-task').style.display = 'none';
    document.getElementById('popup-add-task-div').style.display = 'none';
    document.getElementById('popup-add-task-edit').style.display = 'none';
}

function closePopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    let content = document.getElementById('popup-add-task-content');
    popup.style.display = 'none';
    content.classList.remove('slide-in');
    content.classList.add('slide-out');
}


function renderAddTaskForPopup() {
    e.preventDefault();
}


function checkCategoryButton() {
    let categoryBtn = document.querySelectorAll('.c1');
    categoryBtn.forEach((id) => {
        if (id.textContent === 'Technical Task') {
            id.classList.add('technical-button');
        } else if (id.textContent === 'User Story') {
            id.classList.add('user-story-button');
        }   
    })
}


function createUserButtons(task, i) {
    let iconmember = document.getElementById(`user-board-${i}`);
    let letters = task.letter;
    if (iconmember) {
        for (let k = 0; k < letters.length; k++) {
            const letter = letters[k];
            iconmember.innerHTML += /*html*/`
            <img src="https://ui-avatars.com/api/?name=${letter}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon board-user-icon">
        `;
        }
    }
}


function createSubtasksToAddTaskPopup(i) {
    let div = document.getElementById(`popup-subtasks-${i}`);
    let taskValue = tasks[i];
    for (let k = 0; k < taskValue.subtask.length; k++) {
        let subtasks = taskValue.subtask[k];
        div.innerHTML += /*html*/`
            <div class="each-subtask-section">
                <div>
                    <img src="../assets/img/icons/none-selected.svg" alt="Select Icon" id="select-subtask-board-${k}" onclick="checkOffSubtask('${i}','${k}')">
                    <div id="each-subtasks-${k}" value="not-selected">${subtasks}</div>   
                </div>
            </div>
        `;
    }
    checkSelectedSubtasks(i);
}


function checkSelectedSubtasks(i) {
    let taskValue = tasks[i];
    for (let k = 0; k < taskValue.subtask.length; k++) {
        let img = document.getElementById(`select-subtask-board-${k}`);
        let subtask = document.getElementById(`each-subtasks-${k}`);

        if (taskValue.checkoffs.includes(k.toString())) {
            img.src = '../assets/img/icons/selected.svg';
            img.alt = 'Selected';
            subtask.setAttribute('value', 'selected');
        } else {
            img.src = '../assets/img/icons/none-selected.svg';
            img.alt = 'Not Selected';
            subtask.setAttribute('value', 'not-selected');
        }
    }
}


async function checkOffSubtask(i, k) {
    let img = document.getElementById(`select-subtask-board-${k}`);
    let subtask = document.getElementById(`each-subtasks-${k}`);



    if (img.src.includes('none-selected.svg')) {
        img.src = '../assets/img/icons/selected.svg';
        img.alt = 'Selected';
        subtask.setAttribute('value', 'selected');
        pushSelectedSubtask(i, k);
    } else {
        img.src = '../assets/img/icons/none-selected.svg';
        img.alt = 'Not Selected';
        subtask.setAttribute('value', 'not-selected');
        pushSelectedSubtask(i, k);
    }
    await loadTasks();
    pushSelectedSubtask(i, k);
    updateSelectedSubtasksCount(i);
}


async function pushSelectedSubtask(i, k) {
    await loadTasks();

    let subtask = document.getElementById(`each-subtasks-${k}`);
    let task = tasks[i];

    if (subtask && task) {
        let value = subtask.getAttribute('value');

        if (!Array.isArray(task.checkoffs)) {
            task.checkoffs = [];
        }

        if (value === 'selected') {
            if (!task.checkoffs.includes(k)) {
                task.checkoffs.push(k);
                await setItem('tasks', JSON.stringify(tasks));
            }
        } else {
            let index = task.checkoffs.indexOf(k);
            if (index !== -1) {
                task.checkoffs.splice(index, 1);
                await setItem('tasks', JSON.stringify(tasks));
            }
        }
    }
}


function closePopupAddTaskDiv(i) {
    let content = document.getElementById('popup-add-task-content-div');
    let div = document.getElementById('popup-add-task-div');
    let amount = document.getElementById(`amount-subtasks-${i}`);
    div.style.display = 'none';
    content.classList.remove('slide-in');
    content.classList.add('slide-out');
    amount.innerHTML = /*html*/`
        ${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks
    `;
    calculatePercentageForProgressBar(i);
    updateProgressBar(i);
    checkCategoryButton();
}


function calculatePercentageForProgressBar(i) {
    let total = totalSubtask(i);
    let subtotal = updateSelectedSubtasksCount(i);

    if (total === 0) {
        let percentage = 0;
        return percentage;
    } else {
        let percentage = (subtotal * 100) / total;
        return percentage;
    }
}


async function updateProgressBar(i) {
    let div = document.getElementById(`progress-bar-${i}`);
    if (div) {
        div.style.width = calculatePercentageForProgressBar(i) + '%';
    }
}


function totalSubtask(i) {
    let taskValue = tasks[i];
    if (taskValue && taskValue.subtask && Array.isArray(taskValue.subtask)) {
        return taskValue.subtask.length;
    } else {
        return 0;
    }
}


function updateSelectedSubtasksCount(i) {
    let taskValue = tasks[i];
    if (taskValue && taskValue.checkoffs) {
        return taskValue.checkoffs.length;
    } else {
        return 0;
    }
}


function searchTasks() {
    let input = document.getElementById('input-search-task');
    let filter = input.value.toUpperCase();

    for (let i = 0; i < tasks.length; i++) {
        let todo = document.getElementById(`board-to-do-section-${i}`);
        let array = tasks[i];
        let description = array.description;
        let title = array.title;
        let name = title.toUpperCase();
        let subname = description.toUpperCase();
        if (name.indexOf(filter) > -1 || subname.indexOf(filter) > -1) {
            todo.style.display = 'block';
        } else {
            todo.style.display = 'none';
        }
    }
}


function cancelButton() {
    let button = document.getElementById('clear-button');

    if (button) {
        button.onclick = null;
        button.onclick = function () {
            closePopupAddTask();
        };
        button.innerHTML = /*html*/`
            <div onclick="closePopupAddTask()"></div>
            Cancel<img src="../assets/img/icons/close-black1.svg" alt="Clear" id="clear-button-img">
        `;
    }
}

async function deleteTask(i) {
    await loadTasks();
    tasks.splice(i, 1);

    await setItem('tasks', JSON.stringify(tasks));
    closePopupAddTaskDiv(i);
    await loadToDo();
}


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

function formatDate(date) {
    let dateObj = new Date(date);

    if (!isNaN(dateObj)) {
        let day = dateObj.getDate();
        day = day < 10 ? "0" + day : day;
        let month = dateObj.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let year = dateObj.getFullYear();

        let resultDate = `${day}/${month}/${year}`;

        return resultDate;
    }
}

function deformatDate(date) {
    let parts = date.split('/');
    if (parts.length === 3) {
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];

        let resultDate = `${year}-${month}-${day}`;

        return resultDate;
    }
    return date;
}


function getPriority(priority) {
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');

    prioButtons.forEach(function (button) {
        button.classList.add('prio-notselected');
        if (button.value === priority) {
            button.classList.remove('prio-notselected');
        }
    });
}


async function closePopupEdit(i) {
    let div = document.getElementById(`popup-add-task-edit`);
    div.style.display = 'none';
}


function notData() {
    let todo = document.getElementById('board-to-do');
    // console.log(tasks);
    if (tasks.length === 0) {
        // console.log(tasks.length);
        let noTodotask = document.getElementById('NoToDo');
        noTodotask.classList.remove('d-none');
        noTodotask.style.display = 'flex';
        todo.appendChild(noTodotask);
    }
    return;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function dragStart(ev) {
    let txt = ev.srcElement.id;
    let id = txt[txt.length - 1];
    // tasks.splice(id, 1);
    // console.log(id, 66);
    notData();
    dataTask.splice(id, 1)
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.transform = "rotate(15deg)";
     
   }


function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // console.log(data);
    var draggedElement = document.getElementById(data);
    // ev.target.appendChild(draggedElement);
    draggedElement.style.transform = "rotate(0deg)";
    if (!ev.target.contains(draggedElement)) {
        let category = ev.target.appendChild(draggedElement);
        
    }
    console.log(draggedElement);
    saveDroppedElement(draggedElement);
        
}
  

async function saveDroppedElement(element) {
    let arraypos = element.getAttribute('arraypos');
    let dropTargetId = element.parentElement.id;

    tasks[arraypos].status = `${dropTargetId}`;

    console.log(arraypos);
    console.log(tasks[arraypos].status);


    await setItem('tasks', JSON.stringify(tasks));
    await loadToDo();
}