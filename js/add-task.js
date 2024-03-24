let tasks = [];
let subtasks = [];
let checkoffs = [];
let users = [];
let iniimg = [];


function renderAssignedList() {                                  // generate the contact list of the section assigned-to
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


function renderContactList(list) {                                      // add all contacts to the list
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i].name;
        let img = contacts[i].initials;
        let userIndex = users.indexOf(name);
        let isSelected = userIndex !== -1;
        list.innerHTML += generateHtmlAssignedList(name, img, isSelected, i);
    }
}

// search function for assigned to list
function searchAssignedList() {                 
    let input = document.getElementById('assigned');
    let filter = input.value.toUpperCase();
    // if (document.querySelector('assigned-contact-list')) {
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
    // }
}


function selectCategory(category, exCategory) {                            // evaluate the category inputfield
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


function styleCategoryList(selectedCategory, notSelected, input) {          // styling of the category list if its clicked or not
    selectedCategory.classList.toggle('grey');
    selectedCategory.classList.toggle('white-bg');
    notSelected.classList.remove('grey');
    notSelected.classList.remove('white-bg');
    input.focus();
}


function pushCategorytoInput() {                                            // category which is clicked goes to the inputfield
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


function selectAssignedContacts(i) {                                        // select the contact list of assigned to
    document.getElementById('assigned-button').classList.add('d-none');
    let contact = document.getElementById(`assigned-contacts-${i}`);
    let checkbox = document.getElementById(`checkbox-contact-${i}`);
    contact.classList.toggle('select-contact-blue');
    contact.classList.toggle('white');
    selectBehaviorAssignedContacts(contact, checkbox);
    pushUser(i);
    generateAssignedButton();
}


function selectBehaviorAssignedContacts(contact, checkbox) {                // styling the selected contact
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


function getPrio() {                                                        // choose the prio field
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');

    prioButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            stylingPrioButtons(button, prioButtons);
        });
    });
}


function stylingPrioButtons(button, prioButtons) {                          // styling the prio which is clicked
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


function handleFocus(add, closeCheck) {                                 // functions to display the several icons in subtask
    add.classList.add('d-none');
    closeCheck.classList.remove('d-none');
}


function handleBlur(add, closeCheck) {
    add.classList.remove('d-none');
    closeCheck.classList.add('d-none');
}


function handleInput(subtask, add, closeCheck) {
    if (subtask.value.trim() !== '') {
        handleFocus(add, closeCheck);
    }
}


function handleBlurEvent(subtask, add, closeCheck) {
    if (subtask.value.trim() !== '') {
        handleFocus(add, closeCheck);
    } else {
        handleBlur(add, closeCheck);
    }
}


function setupSubtaskInputFocus() {                                      // change the inputfield of subtask in different modes
    let subtask = document.getElementById('subtask-input');
    let add = document.getElementById('subtask-change-add-icon');
    let closeCheck = document.getElementById('subtask-close-check-icon');

    subtask.addEventListener('focus', () => handleFocus(add, closeCheck));
    subtask.addEventListener('blur', () => handleBlurEvent(subtask, add, closeCheck));
    subtask.addEventListener('input', () => handleInput(subtask, add, closeCheck));
}


function enterOnSubtask() {                                             // create subtasks with an enter key
    let input = document.getElementById('subtask-input');

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('subtask-check-icon').click();
        }
    })
}


function editSubtask(i) {                                                   // able to edit subtask
    let subtaskInput = document.getElementById(`subtask${i}`);
    let listItem = document.getElementById(`each-subtask${i}`);
    let inputValue = subtaskInput.innerText || subtaskInput.textContent;

    makeListItemEditable(listItem, i, inputValue);
}


function makeListItemEditable(listItem, i, inputValue) {
    listItem.classList.add('editable-each');
    listItem.innerHTML = createEditableSubtaskElement(i, inputValue);
}


function deleteSubtask(i) {                                                 // delete subtask befor creating the task
    let position = i;
    subtasks.splice(position, 1);
    let indexToDelete = checkoffs.indexOf(i.toString());
    if (indexToDelete !== -1) {
        checkoffs.splice(indexToDelete, 1); // Lösche das gefundene Element
    }
    let list = document.getElementById('subtasks');
    list.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += generateSubtaskElement(i, text);
    }
}


function pushEditedSubtask(i) {                                             // push each subtasks in subtask array
    let inputField = document.getElementById(`subtask${i}`);
    let newText = inputField.value;
    let position = i;

    if (newText.trim() !== '') {
        subtasks.splice(position, 1, newText);
        updateSubtasklist();
    } else {
        console.log('subtasks: empty field');
    };
}


function updateSubtasklist() {
    let list = document.getElementById('subtasks');
    list.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += generateSubtaskElement(i, text);
    }
}


function clearSubtaskInputField() {
    let input = document.getElementById('subtask-input');
    input.value = '';
}


function clearButtonImgChange() {                                       //change clear button when it is hovering
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


function clearFields() {                                           // clear all value fields
    resetFieldValues();
    hideAssignedList();
    resetGlobalVariables();
    updateSubtasklist();
    resetPrioritySelection();
    generateAssignedButton();
}


function resetFieldValues() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('assigned').value = '';
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('subtask-input').value = '';
}


function hideAssignedList() {
    document.getElementById('assigned-list').classList.add('d-none');
}


function resetGlobalVariables() {
    users = [];
    iniimg = [];
    subtasks = [];
    checkoffs = [];
}


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


function handleFocusedInput(input, required) {
    let isInputEmpty = input.value.trim() === '';
    input.classList.toggle('inputfield-focus-red', isInputEmpty);
    input.classList.toggle('inputfield-focus-blue', !isInputEmpty);
    required.classList.toggle('d-none', !isInputEmpty);
    input.classList.toggle('inputfield-focus-white', false);
}


function handleBlurredInput(input, required) {
    input.classList.remove('inputfield-focus-red', 'inputfield-focus-blue');
    input.classList.add('inputfield-focus-white');
    required.classList.add('d-none');
}


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