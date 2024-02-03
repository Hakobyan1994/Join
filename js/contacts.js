let contacts = ['HAllo'];

async function initAddContact() {
    await init();
    await loadContacts();
    renderContacts();
}

function renderContacts() {
    let allContactsCon = document.getElementById('allContacts');
    allContactsCon.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let addedContact = contacts[i];
        allContactsCon.innerHTML += `
        <div class="all-contacts">
            ${addedContact.name} - ${addedContact.email} - ${addedContact.phone}
        </div>`;
    }
}

async function addToContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let userName = name.value;
    let firstLetter = userName.charAt(0).toUpperCase();


    if (name.value.trim() === '' || email.value.trim() === '' || phone.value.trim() === '') {
        alert('Please fill in all fields.');
    }

    let contact = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value,
        'firstLetter': firstLetter
    };
    contacts.push(contact);

    clearInputs(name, email, phone);

    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
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
    document.getElementById('dialog').classList.remove('d-none');
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
}

function dontCloseCard(event) {
    event.stopPropagation();
}