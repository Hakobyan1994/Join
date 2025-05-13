/**
 * Searches for tasks based on user input.
 */
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


/**
 * Searches for tasks based on user input.
 * 
 * @param {string} filter - The search query.
 * @param {Object} searchResult - Object to store the search result.
 */
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


/**
 * Hides all "no tasks" cards when searching for tasks.
 */
function showNoResultsMessage() {
    let noResultsDiv = document.getElementById('no-results');
    let input = document.getElementById('input-search-task');
    noResultsDiv.style.display = 'flex';
    input.style.border = '1px solid rgba(255, 129, 144, 1)';
    
}


/**
 * Hides the "no results" message and restores the border of the search input field.
 */
function hideNoResultsMessage() {
    let noResultsDiv = document.getElementById('no-results');
    let input = document.getElementById('input-search-task');
    noResultsDiv.style.display = 'none';
    input.style.border = '1px solid #D1D1D1';
}


/**
 * Resets the onclick event of the cancel button and updates its inner HTML to include the cancel text and icon.
 */
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


/**
 * Deletes the task at the given index and updates the task list.
 * 
 * @param {number} i - The index of the task to delete.
 */
async function deleteTask(i) {
    const url=`http://127.0.0.1:8000/join_app/create_tasks/${tasks[i].id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    tasks.splice(i, 1);
    closePopupAddTaskDiv(i);
}


/**
 * Formats the given date string to "DD/MM/YYYY" format.
 * 
 * @param {string} date - The date string to format.
 * @returns {string} The formatted date string.
 */
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


/**
 * Deformats the given date string from "DD/MM/YYYY" format to "YYYY-MM-DD" format.
 * 
 * @param {string} date - The date string to deformat.
 * @returns {string} The deformatted date string.
 */
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


/**
 * Updates the UI to reflect the selected priority.
 * 
 * @param {string} priority - The selected priority value.
 */
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


/**
 * Closes the popup window for editing a task.
 * 
 * @param {number} i - The index of the task.
 */
async function closePopupEdit(i) {
    let div = document.getElementById(`popup-add-task-edit`);
    div.style.display = 'none';
}


/**
 * Saves the edited task after validation and updates the task list.
 * 
 * @param {number} i - The index of the task being edited.
 */ 
 async function getallTasksValue(){
    const url='http://127.0.0.1:8000/join_app/create_tasks/'
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            // console.log('📦 Kontakte aus DB:', data);
            tasks=data
            await loadToDo();
        } else {
            console.error('Fehler beim Abrufen:', data);
        }
    } catch (error) {
        console.error('Netzwerkfehler:', error);
    }
 }
   



async function saveEditedTask(i) {


    // await loadTasks();
    await getallTasksValue()

   
    const task = tasks[i];
    // selectedUserId = task.assignedTo?.map(user => user.id); 
    checkCategoryButton();
    let isValid = validateForm();
    let date = document.getElementById('date');
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let priority = pushPrio();

    // 🛠 Fallback für bereits gesetzte Kontakte
   

    const url = `http://127.0.0.1:8000/join_app/create_tasks/${task.id}`;
    selectedUserId = selectedUserId.filter(id => Number.isInteger(id) && id > 0);
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title.value,
            description: description.value,
            assignedTo_ids: selectedUserId,
            date: date.value,
            prio: priority,
            category: task.category,
            subtasks: subtasks || [],
            checkoffs: checkoffs || [],
            status: task.status
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Fehler beim PUT:", response.status, errorText);
        return;
    }
    const data = await response.json();
    tasks[i] = data; // ✅ Update nur diesen Task
    closeEditPopup();
    await getallTasksValue();
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
function createNewTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let priority = pushPrio();
    let dateValue = date.value;
    let formatedDate = formatDate(dateValue);
    console.log(users)
    // console.log(tasks[i].id)
    let newTask = {
        title: title.value,
        description: description.value,
        // assignedTo_ids: users,
        // letter: iniimg,
        date: dateValue,
        prio: priority,
        // category: categoryArray[0],
        subtasks: subtasks,
        checkoffs: checkoffs,
        status: (tasks[i] && tasks[i].status) ? tasks[i].status : "board-to-do"
    };
    return newTask;
}


/**
 * Updates the task list by adding the new task and removing the edited task.
 * 
 * @param {Object} newTask - The new task object.
 * @param {number} i - The index of the task being edited.
 */
 async function updateTaskList(newTask, i) {
   
    tasks.push(newTask);
    console.log(tasks)
    // tasks.splice(i, 1);
}


/**
 * Saves the tasks array to the local storage.
 */
// async function saveTasks() {
//     await setItem('tasks', JSON.stringify(tasks));
// }


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