let dataTask = [];
let categoryArray = [];


// document.addEventListener('DOMContentLoaded', () => {
//     if (!authToken) {
//       console.log('authToken nicht da');
//       
//       if (btn) {
//         btn.disabled = true;
//         btn.title = 'Du musst eingeloggt sein';
//       }
//     }
//   });

/**
 * Renders the main board interface.
 */
async function renderBoardMain() {
    let content = document.getElementById('render-board');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainBoard();
    emptyPages();
    if (authToken!==null || asguest!==null) {
        await loadToDo();
        // await getAllContacts()
        // await loadContacts();
        await getAllContacts();
        await loadTaskss();
        checkNoCards();
    }
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
    if(popup){   
    popup.style.display = 'none';
    content.classList.remove('slide-in');
    content.classList.add('slide-out');
}
}


function renderAddTaskForPopup() {
    e.preventDefault();
}


/**
 * Checks and styles category buttons.
 */
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


/**
 * Creates user buttons for a task.
 * 
 * @param {Object} task - The task object containing user information.
 * @param {number} i - The index of the task.
 */
function createUserButtons(task, i) {
    let iconmember = document.getElementById(`user-board-${i}`);
    let letters = task.letter;
    let maxIcons = 4;
    // let remainingIcons = letters.length - maxIcons;
    // if (iconmember) {
    //     if(remainingIcons > 0) {
    //         greaterThanFour(letters, iconmember, maxIcons, remainingIcons);
    //     } else if (remainingIcons <= 0) {
    //         smallerThanFour(letters, iconmember);
    //     }
    // }
}


/**
 * Renders user buttons when there are more than four users assigned to a task.
 * 
 * @param {string[]} letters - The array of initials of users assigned to the task.
 * @param {HTMLElement} iconmember - The HTML element where the user buttons will be rendered.
 * @param {number} maxIcons - The maximum number of user buttons to be displayed.
 * @param {number} remainingIcons - The number of additional users beyond the maximum number to be displayed.
 */
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


/**
 * Renders user buttons when there are four or fewer users assigned to a task.
 * 
 * @param {string[]} letters - The array of initials of users assigned to the task.
 * @param {HTMLElement} iconmember - The HTML element where the user buttons will be rendered.
 */
function smallerThanFour(letters, iconmember) {
    for (let k = 0; k < letters.length; k++) {
        const letter = letters[k];
        iconmember.innerHTML += /*html*/`
        <img src="https://ui-avatars.com/api/?name=${letter}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon board-user-icon">
        `;
    }
}


/**
 * Creates subtasks for the task in the popup.
 * 
 * @param {number} i - The index of the task.
 */
function createSubtasksToAddTaskPopup(i) {
    let div = document.getElementById(`popup-subtasks-${i}`);
    let taskValue = tasks[i];

    if (!taskValue.subtasks || taskValue.subtasks.length === 0) return;
    for (let k = 0; k < taskValue.subtasks.length; k++) {
        let subtasks = taskValue.subtasks[k];
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



/**
 * Checks and updates the selected subtasks for the task in the popup.
 * 
 * @param {number} i - The index of the task.
 */
function checkSelectedSubtasks(i) {
    let taskValue = tasks[i];
    if (!taskValue.subtasks) return;
    for (let k = 0; k < taskValue.subtasks.length; k++) {
        let img = document.getElementById(`select-subtask-board-${k}`);
        let subtask = document.getElementById(`each-subtasks-${k}`);
        if (Array.isArray(taskValue.checkoffs) && taskValue.checkoffs.includes(k.toString())) {
            img.src = '../assets/img/icons/selected.svg';
            subtask.setAttribute('value', 'selected');
        } else {
            img.src = '../assets/img/icons/none-selected.svg';
            subtask.setAttribute('value', 'not-selected');
        }
    }
}


/**
 * Handles checking off a subtask in the task popup.
 * 
 * @param {number} i - The index of the task.
 * @param {number} k - The index of the subtask.
 */
async function checkOffSubtask(i, k) {
    let img = document.getElementById(`select-subtask-board-${k}`);
    let subtask = document.getElementById(`each-subtasks-${k}`);
    highlightCheckOffSubtask(i, k, img, subtask);
    await loadTasks();
    pushSelectedSubtask(i, k);
    updateSelectedSubtasksCount(i);
}


/**
 * Highlights or un-highlights a subtask in the task popup based on its current state.
 * 
 * @param {number} i - The index of the task.
 * @param {number} k - The index of the subtask.
 * @param {HTMLImageElement} img - The image element representing the subtask check icon.
 * @param {HTMLElement} subtask - The element representing the subtask.
 */
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


/**
 * Closes the task popup and updates the task details accordingly.
 * 
 * @param {number} i - The index of the task.
 */
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


/**
 * Calculates the percentage completion for the progress bar of a task.
 * 
 * @param {number} i - The index of the task.
 * @returns {number} - The percentage completion.
 */
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


/**
 * Updates the width of the progress bar based on the percentage completion.
 * 
 * @param {number} i - The index of the task.
 */
async function updateProgressBar(i) {
    let div = document.getElementById(`progress-bar-${i}`);
    if (div) {
        div.style.width = calculatePercentageForProgressBar(i) + '%';
    }
}


/**
 * Calculates the total number of subtasks for a given task.
 * 
 * @param {number} i - The index of the task.
 * @returns {number} - The total number of subtasks.
 */
function totalSubtask(i) {
    let taskValue = tasks[i];
    if (taskValue && taskValue.subtask && Array.isArray(taskValue.subtask)) {
        return taskValue.subtask.length;
    } else {
        return 0;
    }
}


/**
 * Calculates the number of selected subtasks for a given task.
 * 
 * @param {number} i - The index of the task.
 * @returns {number} - The number of selected subtasks.
 */
function updateSelectedSubtasksCount(i) {
    let taskValue = tasks[i];
    if (taskValue && taskValue.checkoffs) {
        return taskValue.checkoffs.length;
    } else {
        return 0;
    }
}


/**
 * Highlights the progress bar of a task based on the completion status of subtasks.
 * 
 * @param {number} i - The index of the task.
 */
async function highlightProgressbar(i) {
    let text = document.getElementById(`amount-subtasks-${i}`);
    let bar = document.getElementById(`progress-bar-${i}`);
    if (bar) {
        if (updateSelectedSubtasksCount(i) === totalSubtask(i)) {
            text.style.fontWeight = '600';
            bar.style.backgroundColor = 'rgba(0, 89, 243, 1)';
        } else {
            text.style.fontWeight = '400';
            bar.style.backgroundColor = 'rgba(69, 137, 255, 1)';
        }
    }
}


/**
 * Empties the progress bar of a task if there are no subtasks.
 * 
 * @param {number} i - The index of the task.
 */
async function emptyProgressBar(i) {
    let progressbar = document.getElementById(`progress-bar-div-${i}`);
    if (progressbar) {
        if (totalSubtask(i) === 0) {
            progressbar.style.display = 'none';
        } else {
            progressbar.style.display = 'flex';
        }
    }
}