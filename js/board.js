let dataTask = [];
let categoryArray = [];


/**
 * Renders the main board interface.
 */
async function renderBoardMain() {
    let content = document.getElementById('render-board');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainBoard();
    emptyPages();
    loadToDo();
    await loadContacts();
    await loadTasks();
}


/**
 * Empties any open pages.
 */
function emptyPages() {
    document.getElementById('popup-add-task').style.display = 'none';
    document.getElementById('popup-add-task-div').style.display = 'none';
    document.getElementById('popup-add-task-edit').style.display = 'none';
}


/**
 * Closes the 'Add Task' popup.
 */
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
    let maxIcons = 4;
    let remainingIcons = letters.length - maxIcons;
    if (iconmember) {
        if(remainingIcons > 0) {
            greaterThanFour(letters, iconmember, maxIcons, remainingIcons);
        } else if (remainingIcons <= 0) {
            smallerThanFour(letters, iconmember);
        }
    }
}


function greaterThanFour(letters, iconmember, maxIcons, remainingIcons) {
    for (let k = 0; k < maxIcons; k++) {
        const letter = letters[k];
        iconmember.innerHTML += /*html*/`
        <img src="https://ui-avatars.com/api/?name=${letter}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon board-user-icon">
        `;
    }
    iconmember.innerHTML += /*html*/`
    <img src="https://ui-avatars.com/api/?name=${remainingIcons}&background=2a3647&color=fff" alt="Initials" class="assigned-contact-list-icon board-user-icon">
    `;
}


function smallerThanFour(letters, iconmember) {
    for (let k = 0; k < letters.length; k++) {
        const letter = letters[k];
        iconmember.innerHTML += /*html*/`
        <img src="https://ui-avatars.com/api/?name=${letter}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon board-user-icon">
        `;
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
            subtask.setAttribute('value', 'selected');
        } else {
            img.src = '../assets/img/icons/none-selected.svg';
            subtask.setAttribute('value', 'not-selected');
        }
    }
}


async function checkOffSubtask(i, k) {
    let img = document.getElementById(`select-subtask-board-${k}`);
    let subtask = document.getElementById(`each-subtasks-${k}`);

    highlightCheckOffSubtask(i, k, img, subtask);

    await loadTasks();
    pushSelectedSubtask(i, k);
    updateSelectedSubtasksCount(i);
}


function highlightCheckOffSubtask(i, k, img, subtask) {
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
}


function closePopupAddTaskDiv(i) {
    let content = document.getElementById('popup-add-task-content-div');
    let div = document.getElementById('popup-add-task-div');
    let amount = document.getElementById(`amount-subtasks-${i}`);
    div.style.display = 'none';
    content.classList.remove('slide-in');
    content.classList.add('slide-out');
    // amount.innerHTML = /*html*/`
    //     ${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks
    // `;
    calculatePercentageForProgressBar(i);
    updateProgressBar(i);
    checkCategoryButton();
    highlightProgressbar(i);
    loadToDo();
}


function calculatePercentageForProgressBar(i) {
    let total = totalSubtask(i);
    let subtotal = updateSelectedSubtasksCount(i);

    if (total === 0) {
        let percentage = 0;
        return Math.round(percentage);
    } else {
        let percentage = (subtotal * 100) / total;
        return Math.round(percentage);
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


async function highlightProgressbar(i) {
    let text = document.getElementById(`amount-subtasks-${i}`);
    let bar = document.getElementById(`progress-bar-${i}`);
    if(bar) {
        if(updateSelectedSubtasksCount(i) === totalSubtask(i)) {
            text.style.fontWeight = '600';
            bar.style.backgroundColor = 'rgba(0, 89, 243, 1)';
        } else {
            text.style.fontWeight = '400';
            bar.style.backgroundColor = 'rgba(69, 137, 255, 1)';
        }
    }
}


async function emptyProgressBar(i) {
    let progressbar = document.getElementById(`progress-bar-div-${i}`);
    if(progressbar) {
        if (totalSubtask(i) === 0) {
            progressbar.style.display = 'none';
        } else {
            progressbar.style.display = 'flex';
        }
    }
}



function searchTasks() {
    hideAllNoCards();
    let input = document.getElementById('input-search-task');
    let filter = input.value.toUpperCase();
    let searchResult = { found: false };
    searchFunction(filter, searchResult);

    if (!searchResult.found) {
        showNoResultsMessage();
    } else {
        hideNoResultsMessage();
    }
}


function searchFunction(filter, searchResult) {
    for (let i = 0; i < tasks.length; i++) {
        let todo = document.getElementById(`board-to-do-section-${i}`);
        let array = tasks[i];
        let description = array.description;
        let title = array.title;
        let name = title.toUpperCase();
        let subname = description.toUpperCase();
        if (name.indexOf(filter) > -1 || subname.indexOf(filter) > -1) {
            todo.style.display = 'block';
            searchResult.found = true; 
        } else {
            todo.style.display = 'none';
        }
    }
}


function hideAllNoCards() {
    let input = document.getElementById('input-search-task');
    let div = document.querySelectorAll('.Card_NotasksTodo');
    if(input.value !== '') {
        div.forEach(card => {
            card.style.display = 'none';
        });
    } else {
        div.forEach(card => {
            card.style.display = 'flex';
        });
    }
}


function showNoResultsMessage() {
    let noResultsDiv = document.getElementById('no-results');
    let input = document.getElementById('input-search-task');
    noResultsDiv.style.display = 'flex';
    input.style.border = '1px solid rgba(255, 129, 144, 1)';
    
}


function hideNoResultsMessage() {
    let noResultsDiv = document.getElementById('no-results');
    let input = document.getElementById('input-search-task');
    noResultsDiv.style.display = 'none';
    input.style.border = '1px solid #D1D1D1';
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