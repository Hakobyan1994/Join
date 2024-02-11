let contacts = [];
let contactIdCounter = 0;
let initials;

function renderContacts() {
    let contactsContainer = document.getElementById('allContacts');
    contactsContainer.innerHTML = '';

    if (contacts.length > 0 && contacts.every(contact => contact.name)) {
        contacts.sort((a, b) => a.name.localeCompare(b.name));
    }

    let addBtn = document.getElementById('addBtn');
    addBtn.innerHTML = generateAddBtn();

    let currentLetter = '';
    let currentSeparator = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstLetter = '';
        if (contact.name && contact.name.length > 0) {
            firstLetter = contact.name.charAt(0).toUpperCase();
        }

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            currentSeparator = generateSeparator();
            contactsContainer.innerHTML += generateLetterCon(currentLetter) + currentSeparator;
        }
        contactIdCounter++;
        const imageId = `contactImage${contactIdCounter}`;
        contactsContainer.innerHTML += generateContact(i, contact, imageId);
        addInitialsToContactImage(contact, imageId);
    }
}

async function addToContacts() {
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');

    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();

    let formattedName = splitNameAndCapitalize(name);

    let initials = formatInitials(formattedName);

    if (formattedName === '' || email === '' || phone === '') {
        alert('Please fill in all fields.');
    } else {
        addContactToArray(formattedName, email, phone, initials);
        clearInputs(nameInput, emailInput, phoneInput);
        closeDialog();
        await setItem('contacts', JSON.stringify(contacts));
        await loadContacts();
        renderContacts();
    }
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
        'contactImg': contactImg,
        'color': randomColor
    };
    contacts.push(contact);
}

async function saveContact(i) {
    let contact = contacts[i];
    let contactName = document.getElementById('nameEdit').value;
    let contactEmail = document.getElementById('emailEdit').value;
    let contactPhone = document.getElementById('phoneEdit').value;

    contact.name = contactName;
    contact.email = contactEmail;
    contact.phone = contactPhone;

    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    document.getElementById('editMask').innerHTML = '';
    closeDialog();
    contactInfoSlider(i);
}

function clearInputs(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Error in loadContacts:', e);
    }
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
        imageElement.src = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
        applyRandomColorToImage(imageElement, initials);
    }
}

function getRandomColor(seed) {
    const letters = '0123456789ABCDEF';
    let color = '#';
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
    return color;
}

function applyRandomColorToImage(imageElement, seed) {
    const randomColor = getRandomColor(seed);
    imageElement.style.backgroundColor = randomColor;
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
    document.getElementById('editMask').classList.add('d-none');
}

function dontCloseCard(event) {
    event.stopPropagation();
}

function renderDialog() {
    let dialog = document.getElementById('dialog');
    dialog.classList.remove('d-none');
    dialog.innerHTML = generateDialog();
}

async function showEditMask(i) {
    let dialog = document.getElementById('editMask');
    dialog.classList.remove('d-none');
    dialog.innerHTML = generateEditMask(i);
    loadContactInfo(i);
    displayContactImage(i);
}

function displayContactImage(i) {
    let contact = contacts[i];
    let contactImage = document.getElementById('contactImageEdit'); 
    if (contactImage) {
        contactImage.src = `https://ui-avatars.com/api/?name=${contact.initials}&background=random&color=fff`;
        contactImage.style.width = '100px'; 
        contactImage.style.height = '100px';
        contactImage.style.backgroundColor = 'transparent';
        contactImage.alt = contact.initials;
    }
}

function loadContactInfo(i) {
    document.getElementById('nameEdit').value = contacts[i].name;
    document.getElementById('emailEdit').value = contacts[i].email;
    document.getElementById('phoneEdit').value = contacts[i].phone;
}

async function deleteContact(i) {
    contacts.splice(i, 1);
    document.getElementById('contactSlider').innerHTML = '';
    closeDialog();
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}

function contactInfoSlider(i) {
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    contactInfoSlider.innerHTML = '';
    contactInfoSlider.classList.add('show');

    let contact = contacts[i];
    let contactName = contact.name;
    let contactEmail = contact.email;
    let contactPhone = contact.phone;
    let imageId = `contactImageSlider`;
    contactInfoSlider.innerHTML = generateContactInfoSlider(i, contactName, contactEmail, contactPhone, imageId);
    addInitialsToContactImage(contact, imageId);

    let imageElement = document.getElementById(imageId);
    if (imageElement) {
        applyRandomColorToImage(imageElement, contact.initials);
    }
}