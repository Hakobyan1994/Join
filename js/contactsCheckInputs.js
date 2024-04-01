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


async function addToContactsCheckValues(nameAddContactError, emailAddContactError, phoneAddContactError, name, email, phone, nameInput, emailInput, phoneInput) {
    addContactNameCheck(name, nameAddContactError);
    addContactPhoneCheck(phone, phoneAddContactError);
    addContactEmailCheck(email, emailAddContactError);
    checkIfAddContactInputsEmpty(name, phone, email);
    checkInputs(nameInput, emailInput, phoneInput, name, email, phone);
}


function addContactNameCheck(name, nameAddContactError) {
    if (!name) {
        nameAddContactError.classList.remove('d-none');
        nameAddContactError.innerHTML = `Please enter a name`;
    } else {
        nameAddContactError.classList.add('d-none');
    }
}


function addContactPhoneCheck(phone, phoneAddContactError) {
    if (!phone) {
        phoneAddContactError.classList.remove('d-none');
        phoneAddContactError.innerHTML = `Please enter a phone number`;
    } else {
        phoneAddContactError.classList.add('d-none');
    }
}


function addContactEmailCheck(email, emailAddContactError) {
    if (!email || !isValidEmail(email)) {
        emailAddContactError.classList.remove('d-none');
        emailAddContactError.innerHTML = !email ? `Please enter an email` : `Please enter a valid email adress`;
        return;
    } else {
        emailAddContactError.classList.add('d-none');
    }
    if (!email.includes('.com') && !email.includes('.de')) {
        emailAddContactError.classList.remove('d-none');
        emailAddContactError.innerHTML = `Please enter a valid email address`;
    } else {
        emailAddContactError.classList.add('d-none');
    }
}


function checkIfAddContactInputsEmpty(name, phone, email) {
    if (!name || !email || !phone) {
        return;
    }
}


function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}


function checkInputs(nameInput, emailInput, phoneInput, name, email, phone) {
    let formattedName = splitNameAndCapitalize(name);
    let initials = formatInitials(formattedName);
    let existingEmail = document.getElementById('emailAlreadyExists');
    checkInputsHELP(existingEmail, email);
    addToContactsOnSuccess(nameInput, emailInput, phoneInput, name, email, phone, formattedName, initials);
}


function checkInputsHELP(existingEmail, email) {
    if (checkExistingEmail(email)) {
        existingEmail.classList.remove('d-none');
        existingEmail.innerHTML = `Email already exists`;
        return;
    } else {
        existingEmail.classList.add('d-none');
    }
}


function checkExistingEmail(email) {
    return contacts.some(contact => contact.email === email);
}


function saveContact(i) {
    let contact = contacts[i];
    let contactName = document.getElementById('nameEdit').value;
    let contactEmail = document.getElementById('emailEdit').value;
    let contactPhone = document.getElementById('phoneEdit').value;
    let nameEditContactError = document.getElementById('nameErrorMessage');
    let emailEditContactError = document.getElementById('emailErrorMessage');
    let phoneEditContactError = document.getElementById('phoneErrorMessage');
    contact.name = contactName;
    contact.email = contactEmail;
    contact.phone = contactPhone;
    saveContactCheckValues(nameEditContactError, emailEditContactError, phoneEditContactError, contactName, contactEmail, contactPhone, i);
}


function saveContactCheckValues(nameEditContactError, emailEditContactError, phoneEditContactError, contactName, contactEmail, contactPhone, i) {
    saveContactNameCheck(contactName, nameEditContactError);
    saveContactPhoneCheck(contactPhone, phoneEditContactError);
    saveContactEmailCheck(contactEmail, emailEditContactError);
    checkIfSaveContactInputsEmpty(contactName, contactEmail, contactPhone);
    saveContactHelp(i, contacts);
}


function saveContactNameCheck(contactName, nameEditContactError) {
    if (!contactName.trim()) {
        nameEditContactError.classList.remove('d-none');
        nameEditContactError.innerHTML = `Please enter a name`;
    } else {
        nameEditContactError.classList.add('d-none');
    }
}


function saveContactPhoneCheck(contactPhone, phoneEditContactError) {
    if (!contactPhone.trim()) {
        phoneEditContactError.classList.remove('d-none');
        phoneEditContactError.innerHTML = `Please enter a phone number`;
    } else {
        phoneEditContactError.classList.add('d-none');
    }
}


function saveContactEmailCheck(contactEmail, emailEditContactError) {
    if (!contactEmail.trim() || !isValidEmail(contactEmail)) {
        emailEditContactError.classList.remove('d-none');
        emailEditContactError.innerHTML = !contactEmail.trim() ? `Please enter an email` : `Please enter a valid email address`;
        return;
    } else {
        emailEditContactError.classList.add('d-none');
    }
    if (!contactEmail.includes('.com') && !contactEmail.includes('.de')) {
        emailEditContactError.classList.remove('d-none');
        emailEditContactError.innerHTML = `Please enter a valid email address`;
        return;
    } else {
        emailEditContactError.classList.add('d-none');
    }
}


function checkIfSaveContactInputsEmpty(contactName, contactEmail, contactPhone) {
    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
        return;
    }
}


async function saveContactHelp(i, contacts) {
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    closeEditContactSlider();
    showContactInfoSlider(i);
}