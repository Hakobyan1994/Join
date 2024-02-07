let contacts = [];
let contactIdCounter = 0;

function renderContacts() {
    let contactsContainer = document.getElementById('allContacts');
    contactsContainer.innerHTML = '';
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    let currentLetter = '';
    let currentSeparator = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            currentSeparator = generateSeparator();
            contactsContainer.innerHTML += generateLetterCon(currentLetter) + currentSeparator;
        }
        contactIdCounter++;
        const imageId = `contactImage${contactIdCounter}`;
        contactsContainer.innerHTML += generateContact(contact, imageId);
        addInitialsToContactImage(contact, imageId);
    }
}

async function addToContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    addContactToArray(name, email, phone);
    clearInputs(name, email, phone);
    closeDialog();
    renderContacts();

    await setItem('contacts', JSON.stringify(contacts));
}

function addContactToArray(name, email, phone) {
    if (name.value.trim() === '' || email.value.trim() === '' || phone.value.trim() === '') {
        alert('Please fill in all fields.');
    } else {
        let contact = {
            'name': name.value,
            'email': email.value,
            'phone': phone.value
        };
        contacts.push(contact);
    }
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
    const nameParts = contact.name.trim().split(' ');
    let initials = '';

    for (let i = 0; i < nameParts.length; i++) {
        initials += nameParts[i].charAt(0).toUpperCase();
    }

    const imageElement = document.getElementById(imageId);
    imageElement.alt = initials;
    imageElement.src = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
    applyRandomColorToImage(imageElement, initials);
}

function getRandomColor(seed) {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const charIndex = (seed.charCodeAt(i % seed.length) + i) % 16;
        color += letters[charIndex];
    }
    return color;
}

function applyRandomColorToImage(imageElement, seed) {
    const randomColor = getRandomColor(seed);
    imageElement.style.backgroundColor = randomColor;
}

function slideInAddContact() {

}

function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
}

function dontCloseCard(event) {
    event.stopPropagation();
}

function renderDialog() {
    let dialog = document.getElementById('dialog');
    dialog.classList.remove('d-none');
    dialog.innerHTML = generateDialog();
}


function contactInfoSlider() {
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    contactInfoSlider.innerHTML = '';

    contactInfoSlider.innerHTML = generateContactInfoSlider();
}

function openContactSlider() {
    let contactSlider = document.getElementById('contactSlider');
    contactSlider.classList.toggle('d-none');
}