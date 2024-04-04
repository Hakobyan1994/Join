let tasks = [];
let subtasks = [];
let checkoffs = [];
let users = [];
let iniimg = [];


/**
 * Renders the assigned list by updating the elements
 */
function renderAssignedList() {                             
    let list = document.getElementById('assigned-list');
    let assignedButton = document.getElementById('assigned-button');
    let input = document.getElementById('assigned');
    list.classList.remove('d-none');
    if(!list.classList.contains('d-none')) {
        assignedButton.classList.add('d-none');
        input.placeholder = '';
    } else {
        assignedButton.classList.remove('d-none');
        input.placeholder = 'Select contacts to assign';
    }
    list.innerHTML = '';
    resetAllSelectedContacts();
}


/**
 * Toggles the visibility of the assigned list and updates UI elements accordingly.
 */
function toggleAssignedlist() {
    let list = document.getElementById('assigned-list');
    let assignedButton = document.getElementById('assigned-button');
    list.classList.toggle('d-none');
    if(!list.classList.contains('d-none')) {
        assignedButton.classList.add('d-none');
        input.placeholder = '';
    } else {
        assignedButton.classList.remove('d-none');
        input.placeholder = 'Select contacts to assign';
    }
}


/**
 * Resets all selected contacts by clearing their selection status.
 */
function resetAllSelectedContacts() {
    let list = document.getElementById('assigned-list');
    renderContactList(list);
    for (let i = 0; i < contacts.length; i++) {
        let assignedContact = document.getElementById(`assigned-contacts-${i}`);
        if (assignedContact.classList.contains === 'white') {
            assignedContact.classList.remove('select-contact-blue');
            assignedContact.classList.remove('white');
        }        
    }
}


/**
 * Renders the contact list in the assigned list.
 * 
 * @param {HTMLElement} list - The element representing the assigned list.
 */
function renderContactList(list) {
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i].name;
        let img = contacts[i].initials;
        let userIndex = users.indexOf(name);
        let isSelected = userIndex !== -1;
        list.innerHTML += generateHtmlAssignedList(name, img, isSelected, i);
    }
}


/**
 * Searches the assigned list for contacts matching the input value.
 */
function searchAssignedList() {                 
    let input = document.getElementById('assigned');
    let filter = input.value.toUpperCase();
    for (let i = 0; i < contacts.length; i++) {
        let list = document.getElementById(`assigned-contacts-${i}`);
        let array = contacts[i].name;
        let name = array.toUpperCase();
        if (name.indexOf(filter) > -1) {
            list.style.display = 'flex';
        } else {
            list.style.display = 'none';
        }
    }
}


/**
 * Selects a category and performs necessary UI updates.
 * 
 * @param {string} category - The ID of the selected category element.
 * @param {string} exCategory - The ID of the previously selected category element.
 */
function selectCategory(category, exCategory) {
    let selectedCategory = document.getElementById(category);
    let notSelected = document.getElementById(exCategory);
    let input = document.getElementById('category');

    if (category === 'technical') {
        styleCategoryList(selectedCategory, notSelected, input);
    }
    else if (category === 'story') {
        styleCategoryList(selectedCategory, notSelected, input);
    }
    pushCategorytoInput();
    inputfieldFocus('category');
}


/**
 * Styles the category list based on the selected category.
 * 
 * @param {HTMLElement} selectedCategory - The selected category element.
 * @param {HTMLElement} notSelected - The previously selected category element.
 * @param {HTMLElement} input - The input field for category selection.
 */
function styleCategoryList(selectedCategory, notSelected, input) {
    selectedCategory.classList.toggle('grey');
    selectedCategory.classList.toggle('white-bg');
    notSelected.classList.remove('grey');
    notSelected.classList.remove('white-bg');
    input.focus();
}


/**
 * Pushes the selected category to the input field and hides the category list.
 */
function pushCategorytoInput() {
    let categoryInput = document.getElementById('category');
    let approvedElements = document.querySelectorAll('.grey');
    let list = document.getElementById('category-list');

    if (approvedElements.length > 0) {
        categoryInput.value = approvedElements[0].textContent;
        list.classList.add('d-none');
    } else {
        categoryInput.value = '';
        inputfieldFocus('category');
    }
}


/**
 * Selects assigned contacts and performs necessary UI updates.
 *
 * @param {number} i - The index of the assigned contact.
 */
function selectAssignedContacts(i) {
    document.getElementById('assigned-button').classList.add('d-none');
    let contact = document.getElementById(`assigned-contacts-${i}`);
    let checkbox = document.getElementById(`checkbox-contact-${i}`);
    contact.classList.toggle('select-contact-blue');
    contact.classList.toggle('white');
    selectBehaviorAssignedContacts(contact, checkbox);
    pushUser(i);
    generateAssignedButton();
}


/**
 * Handles selection behavior for assigned contacts.
 * 
 * @param {HTMLElement} contact - The assigned contact element.
 * @param {HTMLElement} checkbox - The checkbox element associated with the contact.
 */
function selectBehaviorAssignedContacts(contact, checkbox) {
    if (contact.classList.contains('select-contact-blue')) {
        checkbox.src = '../assets/img/icons/selected1.svg';
        checkbox.classList.remove('checkbox-none-selected');
        checkbox.classList.add('checkbox-selected');
    } else {
        checkbox.src = '../assets/img/icons/none-selected1.svg';
        checkbox.classList.add('checkbox-none-selected');
        checkbox.classList.remove('checkbox-selected');
    }
}


/**
 * Gets the priority level from the user's selection.
 */
function getPrio() {
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');

    prioButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            stylingPrioButtons(button, prioButtons);
        });
    });
}


/**
 * Styles the priority buttons based on user selection.
 * 
 * @param {HTMLElement} button - The clicked priority button.
 * @param {NodeList} prioButtons - The list of all priority buttons.
 */
function stylingPrioButtons(button, prioButtons) {
    if (!button.classList.contains('prio-notselected')) {
        button.classList.add('prio-notselected')
    } else {
        prioButtons.forEach(function (btn) {
            btn.classList.remove('prio-notselected');
            btn.classList.add('prio-notselected');
        });
        button.classList.add('prio-notselected');
        button.classList.remove('prio-notselected');
    }
}


/**
 * Handles focus behavior by showing or hiding elements.
 * 
 * @param {HTMLElement} add - The element to be hidden.
 * @param {HTMLElement} closeCheck - The element to be shown.
 */
function handleFocus(add, closeCheck) {
    add.classList.add('d-none');
    closeCheck.classList.remove('d-none');
}


/**
 * Handles blur behavior by showing or hiding elements.
 * 
 * @param {HTMLElement} add - The element to be shown.
 * @param {HTMLElement} closeCheck - The element to be hidden.
 */
function handleBlur(add, closeCheck) {
    add.classList.remove('d-none');
    closeCheck.classList.add('d-none');
}


/**
 * Handles input behavior by showing or hiding elements based on input.
 *
 * @param {HTMLElement} subtask - The input field for subtasks.
 * @param {HTMLElement} add - The element to be shown.
 * @param {HTMLElement} closeCheck - The element to be hidden.
 */
function handleInput(subtask, add, closeCheck) {
    if (subtask.value.trim() !== '') {
        handleFocus(add, closeCheck);
    }
}


/**
 * Handles blur event by showing or hiding elements based on input.
 * 
 * @param {HTMLElement} subtask - The input field for subtasks.
 * @param {HTMLElement} add - The element to be shown.
 * @param {HTMLElement} closeCheck - The element to be hidden.
 */
function handleBlurEvent(subtask, add, closeCheck) {
    if (subtask.value.trim() !== '') {
        handleFocus(add, closeCheck);
    } else {
        handleBlur(add, closeCheck);
    }
}


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
    } else if(board) {
        board.classList.remove('d-none');
    }
    setTimeout(() => {
        renderPage('board-page', 'render-board');
    }, "1500");
}