let contacts = [];

function addToContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    let contact = {
        "name": name.value,
        "email": email.value,
        "phone": phone.value
    };

    contacts.push(contact);
}

function clearInputs(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}