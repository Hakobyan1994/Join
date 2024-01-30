let contacts = [];

async function initAddContact() {
    loadContacts();
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.info('could not load contacts');
    }
}

async function addToContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    let contact = {
        "name": name.value,
        "email": email.value,
        "phone": phone.value
    };
    contacts.push(contact);

    clearInputs(name, email, phone);

    await setItem('contacts', JSON.stringify(contacts));
}

function clearInputs(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}

