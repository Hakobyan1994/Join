let contacts = [];

function renderContacts() {
    let contactsContainer = document.getElementById('allContacts');
    contactsContainer.innerHTML = '';
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    let currentLetter = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstLetter = contact.name.charAt(0).toUpperCase();
        contactsContainer.innerHTML += generateContact(contact);
        sortContactsByLetter(contactsContainer, currentLetter, firstLetter);
    }
}

function sortContactsByLetter(contactsContainer, currentLetter, firstLetter) {
    if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        contactsContainer.innerHTML += generateLetter(currentLetter);
        contactsContainer.innerHTML += generateSeparator();
    }
}

async function addToContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    if (name.value.trim() === '' || email.value.trim() === '' || phone.value.trim() === '') {
        alert('Please fill in all fields.');
    } else {
        let contact = {
            'name': name.value,
            'email': email.value,
            'phone': phone.value
        };
        contacts.push(contact);

        clearInputs(name, email, phone);
        closeDialog();
        renderContacts();
        await setItem('contacts', JSON.stringify(contacts));
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
