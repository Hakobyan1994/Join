/**
 * Adds a new contact to the contacts list based on the input values.
 * 
 */
function addToContacts() {
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('emailContacts');
    let phoneInput = document.getElementById('phone');
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();
    let nameAddContactError = document.getElementById('nameAddErrorMessage');
    let emailAddContactError = document.getElementById('emailAddErrorMessage');
    let phoneAddContactError = document.getElementById('phoneAddErrorMessage');

    addToContactsCheckValues(nameAddContactError, emailAddContactError, phoneAddContactError, name, email, phone, nameInput, emailInput, phoneInput);
}

/**
 * Checks the input values for adding a new contact, displays error messages if necessary, and proceeds with adding the contact if all values are valid.
 * 
 * @param {HTMLElement} nameAddContactError - The element to display the error message for the name input.
 * @param {HTMLElement} emailAddContactError - The element to display the error message for the email input.
 * @param {HTMLElement} phoneAddContactError - The element to display the error message for the phone input.
 * @param {string} name - The name input value.
 * @param {string} email - The email input value.
 * @param {string} phone - The phone input value.
 * @param {HTMLElement} nameInput - The name input element.
 * @param {HTMLElement} emailInput - The email input element.
 * @param {HTMLElement} phoneInput - The phone input element.
 */
async function addToContactsCheckValues(nameAddContactError, emailAddContactError, phoneAddContactError, name, email, phone, nameInput, emailInput, phoneInput) {
    if (!name || !email || !phone) {
        addContactNameCheck(name, nameAddContactError);
        addContactPhoneCheck(phone, phoneAddContactError);
        addContactEmailCheck(email, emailAddContactError);
        return;
    }

    if (!isValidEmail(email)) {
        emailAddContactError.classList.remove('d-none');
        emailAddContactError.innerHTML = `Please enter a valid email address`;
        return;
    }
    checkInputs(nameInput, emailInput, phoneInput, name, email, phone);
}

/**
 * Checks if the name input value is empty and displays an error message accordingly.
 * 
 * @param {string} name - The name input value.
 * @param {HTMLElement} nameAddContactError - The element to display the error message for the name input.
 */
function addContactNameCheck(name, nameAddContactError) {
    if (!name) {
        nameAddContactError.classList.remove('d-none');
        nameAddContactError.innerHTML = `Please enter a name`;
    } else {
        nameAddContactError.classList.add('d-none');
    }
}

/**
 * Checks if the phone input value is empty and displays an error message accordingly.
 * 
 * @param {string} phone - The phone input value.
 * @param {HTMLElement} phoneAddContactError - The element to display the error message for the phone input.
 */
function addContactPhoneCheck(phone, phoneAddContactError) {
    if (!phone) {
        phoneAddContactError.classList.remove('d-none');
        phoneAddContactError.innerHTML = `Please enter a phone number`;
    } else {
        phoneAddContactError.classList.add('d-none');
    }
}

/**
 * Checks if the email input value is empty or not a valid email address and displays an error message accordingly.
 * 
 * @param {string} email - The email input value.
 * @param {HTMLElement} emailAddContactError - The element to display the error message for the email input.
 */
function addContactEmailCheck(email, emailAddContactError) {
    if (!email || !isValidEmail(email)) {
        emailAddContactError.classList.remove('d-none');
        emailAddContactError.innerHTML = !email ? `Please enter an email` : `Please enter a valid email address`;
        return;
    } else {
        emailAddContactError.classList.add('d-none');
    }
}

/**
 * Checks if the provided email string matches the pattern of a valid email address.
 * 
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if the email string is valid, otherwise false.
 */
function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.(com|de)/;
    return emailRegex.test(email);
}

/**
 * Checks the inputs for validity and processes them accordingly.
 * If the inputs are valid, it formats the name, generates initials, checks for existing email,
 * and adds the contact to the array of contacts.
 * 
 * @param {HTMLElement} nameInput - The HTML input element for the name.
 * @param {HTMLElement} emailInput - The HTML input element for the email.
 * @param {HTMLElement} phoneInput - The HTML input element for the phone number.
 * @param {string} name - The name input value.
 * @param {string} email - The email input value.
 * @param {string} phone - The phone number input value.
 */
function checkInputs(nameInput, emailInput, phoneInput, name, email, phone) {
    let formattedName = splitNameAndCapitalize(name);
    let initials = formatInitials(formattedName);
    let existingEmail = document.getElementById('emailAlreadyExists');
    checkInputsHELP(existingEmail, email);
    addToContactsOnSuccess(nameInput, emailInput, phoneInput, name, email, phone, formattedName, initials);
}

/**
 * Checks if the provided email already exists in the contacts.
 * If the email exists, it displays a message indicating that the email already exists.
 * 
 * @param {HTMLElement} existingEmail - The HTML element to display the message.
 * @param {string} email - The email to check for existence.
 */
function checkInputsHELP(existingEmail, email) {
    if (checkExistingEmail(email)) {
        existingEmail.classList.remove('d-none');
        existingEmail.innerHTML = `Email already exists`;
        return;
    } else {
        existingEmail.classList.add('d-none');
    }
}

/**
 * Checks if the provided email already exists in the contacts.
 * 
 * @param {string} email - The email to check for existence.
 * @returns {boolean} - Returns true if the email exists in the contacts, otherwise returns false.
 */
function checkExistingEmail(email) {
    return contacts.some(contact => contact.email === email);
}

/**
 * Saves the edited contact information after validation.
 * 
 * @param {number} i - The index of the contact to be edited.
 */
function saveContact(i) {
    let contact = contacts[i];
    let contactName = document.getElementById('nameEdit').value.trim();
    let contactEmail = document.getElementById('emailEdit').value.trim();
    let contactPhone = document.getElementById('phoneEdit').value.trim();
    let nameEditContactError = document.getElementById('nameErrorMessage');
    let emailEditContactError = document.getElementById('emailErrorMessage');
    let phoneEditContactError = document.getElementById('phoneErrorMessage');
    contact.name = contactName;
    contact.email = contactEmail;
    contact.phone = contactPhone;
    saveContactCheckValues(nameEditContactError, emailEditContactError, phoneEditContactError, contactName, contactEmail, contactPhone, i);
}

/**
 * Checks the edited contact information for validity before saving.
 * 
 * @param {HTMLElement} nameEditContactError - The element to display the error message for the contact name.
 * @param {HTMLElement} emailEditContactError - The element to display the error message for the contact email.
 * @param {HTMLElement} phoneEditContactError - The element to display the error message for the contact phone number.
 * @param {string} contactName - The edited name of the contact.
 * @param {string} contactEmail - The edited email of the contact.
 * @param {string} contactPhone - The edited phone number of the contact.
 * @param {number} i - The index of the contact being edited.
 */
function saveContactCheckValues(nameEditContactError, emailEditContactError, phoneEditContactError, contactName, contactEmail, contactPhone, i) {
    if (!contactName || !contactEmail || !contactPhone) {
        saveContactNameCheck(contactName, nameEditContactError);
        saveContactPhoneCheck(contactPhone, phoneEditContactError);
        saveContactEmailCheck(contactEmail, emailEditContactError);
        return;
    }

    if (!isValidEmail(contactEmail)) {
        emailEditContactError.classList.remove('d-none');
        emailEditContactError.innerHTML = `Please enter a valid email address`;
        return;
    }
    saveContactHelp(i, contacts);
}

/**
 * Checks if the edited contact name is provided.
 * 
 * @param {string} contactName - The edited name of the contact.
 * @param {HTMLElement} nameEditContactError - The element to display the error message for the contact name.
 */
function saveContactNameCheck(contactName, nameEditContactError) {
    if (!contactName) {
        nameEditContactError.classList.remove('d-none');
        nameEditContactError.innerHTML = `Please enter a name`;
    } else {
        nameEditContactError.classList.add('d-none');
    }
}

/**
 * Checks if the edited contact phone number is provided.
 * 
 * @param {string} contactPhone - The edited phone number of the contact.
 * @param {HTMLElement} phoneEditContactError - The element to display the error message for the contact phone number.
 */
function saveContactPhoneCheck(contactPhone, phoneEditContactError) {
    if (!contactPhone) {
        phoneEditContactError.classList.remove('d-none');
        phoneEditContactError.innerHTML = `Please enter a phone number`;
    } else {
        phoneEditContactError.classList.add('d-none');
    }
}

/**
 * Checks if the edited contact email is provided and valid.
 * 
 * @param {string} contactEmail - The edited email address of the contact.
 * @param {HTMLElement} emailEditContactError - The element to display the error message for the contact email.
 */
function saveContactEmailCheck(contactEmail, emailEditContactError) {
    if (!contactEmail || !isValidEmail(contactEmail)) {
        emailEditContactError.classList.remove('d-none');
        emailEditContactError.innerHTML = !contactEmail ? `Please enter an email` : `Please enter a valid email address`;
        return;
    } else {
        emailEditContactError.classList.add('d-none');
    }
}

/**
 * Saves the edited contact details to the local storage, renders the updated contacts, and closes the edit contact slider.
 * 
 * @param {number} i - The index of the edited contact in the contacts array.
 * @param {Array} contacts - The array containing the contacts.
 */
async function saveContactHelp(i, contacts) {
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    closeEditContactSlider();
    showContactInfoSlider(i);
}