let tasks = [];
let subtasks = [];
let checkoffs = [];
let users = [];
let iniimg = [];


/**
 * Renders the assigned list by updating the elements
 */
async function renderAssignedList() {
    let list = document.getElementById('assigned-list');
    let assignedButton = document.getElementById('assigned-button');
    let input = document.getElementById('assigned');
    list.classList.remove('d-none');
    if (!list.classList.contains('d-none')) {
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
    let input = document.getElementById('assigned');
    let list = document.getElementById('assigned-list');
    let assignedButton = document.getElementById('assigned-button');
    list.classList.toggle('d-none');
    if (!list.classList.contains('d-none')) {
        assignedButton.classList.add('d-none');
        input.placeholder = '';
    }
    else {
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
async function renderContactList(list) {
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i].name;
        let img = "";
        let checkNameLength = name.trim().split(" ");
        if (checkNameLength.length === 1) {
            img = checkNameLength[0].charAt(0).toUpperCase();
        } else {
            img = checkNameLength[0].charAt(0).toUpperCase() + checkNameLength[1].charAt(0).toUpperCase()
        }
        // let img = contacts[i].name;
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