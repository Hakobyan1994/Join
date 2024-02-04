let contacts = [];

function renderContacts() {
    let allContactsCon = document.getElementById('allContacts');
    allContactsCon.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let addedContact = contacts[i];
        allContactsCon.innerHTML += generateContactList(addedContact);
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