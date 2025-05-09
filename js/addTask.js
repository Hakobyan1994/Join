/**
 * Sets up focus and input event handlers for the subtask input field.
 */
function setupSubtaskInputFocus() {
    let subtask = document.getElementById('subtask-input');
    let add = document.getElementById('subtask-change-add-icon');
    let closeCheck = document.getElementById('subtask-close-check-icon');

    subtask.addEventListener('focus', () => handleFocus(add, closeCheck));
    subtask.addEventListener('blur', () => handleBlurEvent(subtask, add, closeCheck));
    subtask.addEventListener('input', () => handleInput(subtask, add, closeCheck));
}


/**
 * Handles 'Enter' key press event on the subtask input field.
 */
function enterOnSubtask() {
    let input = document.getElementById('subtask-input');

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('subtask-check-icon').click();
        }
    })
}


/**
 * Edits the content of a subtask.
 * 
 * @param {number} i - The index of the subtask.
 */
function editSubtask(i) {
    let subtaskInput = document.getElementById(`subtask${i}`);
    let listItem = document.getElementById(`each-subtask${i}`);
    let inputValue = subtaskInput.innerText || subtaskInput.textContent;

    makeListItemEditable(listItem, i, inputValue);
}


/**
 * Makes a list item editable for subtask modification.
 * 
 * @param {HTMLElement} listItem - The list item element to be made editable.
 * @param {number} i - The index of the subtask.
 * @param {string} inputValue - The current content of the subtask.
 */
function makeListItemEditable(listItem, i, inputValue) {
    listItem.classList.add('editable-each');
    listItem.innerHTML = createEditableSubtaskElement(i, inputValue);
}


/**
 * Deletes a subtask from the list.
 * 
 * @param {number} i - The index of the subtask to be deleted.
 */
function deleteSubtask(i) {
    let position = i;
    subtasks.splice(position, 1);
    let indexToDelete = checkoffs.indexOf(i.toString());
    if (indexToDelete !== -1) {
        checkoffs.splice(indexToDelete, 1);
    }
    let list = document.getElementById('subtasks');
    list.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += generateSubtaskElement(i, text);
    }
}


/**
 * Pushes the edited subtask to the subtasks array.
 * 
 * @param {number} i - The index of the edited subtask.
 */
function pushEditedSubtask(i) {
    let inputField = document.getElementById(`subtask${i}`);
    let newText = inputField.value;
    let position = i;

    if (newText.trim() !== '') {
        subtasks.splice(position, 1, newText);
        updateSubtasklist();
    }
}


/**
 * Updates the subtask list in the UI.
 */
function updateSubtasklist() {
    let list = document.getElementById('subtasks');
    list.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += generateSubtaskElement(i, text);
    }
}


/**
 * Clears the subtask input field.
 */
function clearSubtaskInputField() {
    let input = document.getElementById('subtask-input');
    input.value = '';
}


/**
 * Changes the image source of the clear button on mouseover and mouseout events.
 */
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


/**
 * Clears and resets various fields and UI elements.
 */
function clearFields() {
    resetFieldValues();
    hideAssignedList();
    resetGlobalVariables();
    updateSubtasklist();
    resetPrioritySelection();
    generateAssignedButton();
    getCurrentDate();
}


/**
 * Resets the values of various input fields.
 */
function resetFieldValues() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('assigned').value = '';
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('subtask-input').value = '';
}


/**
 * Hides the assigned list element.
 */
function hideAssignedList() {
    document.getElementById('assigned-list').classList.add('d-none');
}


/**
 * Resets global variables used in the application.
 */
function resetGlobalVariables() {
    users = [];
    iniimg = [];
    subtasks = [];
    checkoffs = [];
}


/**
 * Resets the priority selection UI.
 */
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


/**
 * Focuses on the specified input field and handles related UI changes.
 * 
 * @param {string} field - The ID of the input field to focus on.
 */
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


/**
 * Handles UI changes when the input field is focused.
 * 
 * @param {HTMLElement} input - The input field element.
 * @param {HTMLElement} required - The required indicator element.
 */
function handleFocusedInput(input, required) {
    let isInputEmpty = input.value.trim() === '';
    input.classList.toggle('inputfield-focus-red', isInputEmpty);
    input.classList.toggle('inputfield-focus-blue', !isInputEmpty);
    required.classList.toggle('d-none', !isInputEmpty);
    input.classList.toggle('inputfield-focus-white', false);
}


/**
 * Handles UI changes when the input field is blurred.
 * 
 * @param {HTMLElement} input - The input field element.
 * @param {HTMLElement} required - The required indicator element.
 */
function handleBlurredInput(input, required) {
    input.classList.remove('inputfield-focus-red', 'inputfield-focus-blue');
    input.classList.add('inputfield-focus-white');
    required.classList.add('d-none');
}

/**
 * Opens the board element.
 */
function openBoard() {
    let addTask = document.getElementById('popup-a-to-b');
    let board = document.getElementById('popup-a-to-b-board');
    if(addTask) {
        addTask.classList.remove('d-none');
        console.log('ayo')
    } else if(board) {
        board.classList.remove('d-none');
        console.log('ayo')
    }
    setTimeout(() => {
        renderPage('board-page', 'render-board');
        console.log('sakura')
    }, "1500");
}