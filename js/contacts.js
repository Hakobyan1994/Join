let contacts = [];
let contactIdCounter = 0;
let initials;
let initialsColor = 'white';
let contactInfoSliderVisible = false;
let loggedInUser = [];


async function renderContactsMain() {
    let content = document.getElementById('render-contacts');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainContacts();
    await loadContacts();
    await getLoggedInUser();
    renderContacts();
}


function renderContacts() {
    let addBtn = document.getElementById('addBtn');
    let contactsContainer = document.getElementById('allContacts');
    addContactBtnHTML(addBtn, contactsContainer);
    const predefinedOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    contacts.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        const indexA = predefinedOrder.indexOf(nameA.charAt(0).toUpperCase());
        const indexB = predefinedOrder.indexOf(nameB.charAt(0).toUpperCase());

        if (indexA === -1) {
            return 1;
        }
        if (indexB === -1) {
            return -1;
        }
        return indexA - indexB;
    });

    let lastLetter = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        lastLetter = renderContactImgInitials(lastLetter, contact, i, contactsContainer);
    }
}


function addContactBtnHTML(addBtn, contactsContainer) {
    addBtn.innerHTML = generateAddBtn();
    contactsContainer.innerHTML = generateAddBtnMobile();
}


function renderContactImgInitials(lastLetter, contact, i, contactsContainer) {
    if (contact.name && contact.name.length > 0) {
        const firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== lastLetter) {
            contactsContainer.innerHTML += generateLetterCon(firstLetter) + generateSeparator();
        }

        const imageId = `contactImage${i}`;
        const contactHtml = generateContact(i, contact, imageId);
        contactsContainer.innerHTML += contactHtml;

        addInitialsToContactImage(contact, imageId);
        return firstLetter;
    }
    return lastLetter;
}


function addInitialsToContactImage(contact, imageId) {
    if (contact && contact.name) {
        const nameParts = contact.name.trim().split(' ');
        initials = '';

        for (let i = 0; i < nameParts.length; i++) {
            initials += nameParts[i].charAt(0).toUpperCase();
        }

        const imageElement = document.getElementById(imageId);
        imageElement.alt = initials;
        imageElement.src = `https://ui-avatars.com/api/?name=${contact.initials}&background=random&color=ffffff`;
        applyRandomColorToImage(imageElement, initials);
    }
}


function displayContactImage(i) {
    let contact = contacts[i];
    let contactImage = document.getElementById('contactImageEdit');

    if (contactImage) {
        contactImage.src = `https://ui-avatars.com/api/?name=${contact.initials}&background=random&color=ffffff`;
        contactImage.style.width = '100px';
        contactImage.style.height = '100px';
        contactImage.style.backgroundColor = 'transparent';
        contactImage.alt = contact.initials;
    }
}


function getRandomColor(seed) {
    const letters = '0123456789ABCDEF';
    let color = '#';

    getRandomColorHELP(seed, letters, color);
    return color;
}


function getRandomColorHELP(seed, letters, color) {
    if (seed && seed.length > 0) {
        for (let i = 0; i < 6; i++) {
            const charIndex = (seed.charCodeAt(i % seed.length) + i) % 16;
            color += letters[charIndex];
        }
    } else {
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    }
}


function applyRandomColorToImage(imageElement, seed) {
    const randomColor = getRandomColor(seed);
    imageElement.style.backgroundColor = randomColor;
}


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
    if (!name) {
        nameAddContactError.classList.remove('d-none');
        nameAddContactError.innerHTML = `Please enter a name`;
    } else {
        nameAddContactError.classList.add('d-none');
    }
    if (!phone) {
        phoneAddContactError.classList.remove('d-none');
        phoneAddContactError.innerHTML = `Please enter a phone number`;
    } else {
        phoneAddContactError.classList.add('d-none');
    }
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
    if (!name || !email || !phone) {
        return;
    }
    checkInputs(nameInput, emailInput, phoneInput, name, email, phone);
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


async function addToContactsOnSuccess(nameInput, emailInput, phoneInput, name, email, phone, formattedName, initials) {
    addContactToArray(formattedName, email, phone, initials);
    clearInputs(nameInput, emailInput, phoneInput);
    closeAddContactSlider();
    await setItem('contacts', JSON.stringify(contacts));
    await loadContacts();
    renderContacts();
    addedContactSuccessfully();
}


function addedContactSuccessfully() {
    let success = document.getElementById('successCon');
    success.innerHTML = generateSuccessBtnSlider();
    success.classList.remove('slide-out-success-btn');
    success.classList.add('slide-in-success-btn');
    setTimeoutSuccesDiv(success);
}


function setTimeoutSuccesDiv(success) {
    setTimeout(() => {
        success.classList.remove('slide-in-success-btn');
        success.classList.add('slide-out-success-btn');

        setTimeout(() => {
            success.classList.add('d-none');
        }, 500);
    }, 1500);
}


function splitNameAndCapitalize(inputName) {
    const nameParts = inputName.trim().split(' ');
    const formattedNameParts = [];

    for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i];
        const formattedPart = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        formattedNameParts.push(formattedPart);
    }
    return formattedNameParts.join(' ');
}


function formatInitials(inputName) {
    let nameParts = inputName.trim().split(' ');
    let initials = '';

    for (let i = 0; i < nameParts.length; i++) {
        initials += nameParts[i].charAt(0).toUpperCase();
    }
    return initials;
}


function addContactToArray(name, email, phone, initials) {
    let randomColor = getRandomColor(initials);
    let contactImg = generateContactImage(initials, randomColor);
    let contact = {
        'id': contactIdCounter++,
        'name': name,
        'email': email,
        'phone': phone,
        'initials': initials,
        'initialsColor': initialsColor,
        'contactImg': contactImg,
        'color': randomColor
    };
    contacts.push(contact);
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
    if (!contactName.trim()) {
        nameEditContactError.classList.remove('d-none');
        nameEditContactError.innerHTML = `Please enter a name`;
    } else {
        nameEditContactError.classList.add('d-none');
    }
    if (!contactPhone.trim()) {
        phoneEditContactError.classList.remove('d-none');
        phoneEditContactError.innerHTML = `Please enter a phone number`;
    } else {
        phoneEditContactError.classList.add('d-none');
    }
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
    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
        return;
    }
    saveContactHelp(i, contacts);
}


async function saveContactHelp(i, contacts) {
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    closeEditContactSlider();
    showContactInfoSlider(i);
}


async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Error in loadContacts:', e);
    }
}


function loadContactInfo(i) {
    let contact = contacts[i];
    let nameEdit = document.getElementById('nameEdit');
    let emailEdit = document.getElementById('emailEdit');
    let phoneEdit = document.getElementById('phoneEdit');
    nameEdit.value = contact.name;
    emailEdit.value = contact.email;
    phoneEdit.value = contact.phone;
}


async function deleteContact(i) {
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let headlineMobile = document.getElementById('headlineMobile');
    let contactSlider = document.getElementById('contactSlider');
    deleteContactHELP(contactInfoConMobile, headlineMobile, i);
    contacts.splice(i, 1);
    contactSlider.innerHTML = '';
    closeEditContactSlider();
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}


function deleteContactHELP(contactInfoConMobile, headlineMobile, i) {
    if (window.innerWidth < 860) {
        contactInfoConMobile.classList.add('d-none');
        headlineMobile.classList.add('d-none');
    } else {
        contactInfoConMobile.classList.remove('d-none');
        headlineMobile.classList.remove('d-none');
    }
}


function renderContactInfo(i, contactInfoSlider) {
    let contact = contacts[i];
    let contactName = contact.name;
    let contactEmail = contact.email;
    let contactPhone = contact.phone;
    let imageIdSlider = `contactImageSlider`;
    let imageElement = document.getElementById(imageIdSlider);
    contactInfoSlider.innerHTML = generateContactInfoSlider(i, contactName, contactEmail, contactPhone, imageIdSlider);
    addInitialsToContactImage(contact, imageIdSlider);
    addRandomColorToImg(imageElement, contact);
}


async function getLoggedInUser() {
    let name = await getLoggedInUserFromLocalStorage();
    if (name) {
        let loggedInUserContact = {
            name: name,
            email: ''
        };
        contacts.push(loggedInUserContact);
    }
}

function addUserToLocalStorage(loggedInUserName) {
    localStorage.setItem('loggedInUser', loggedInUserName);
}

function getLoggedInUserFromLocalStorage() {
    return localStorage.getItem('loggedInUser');
}