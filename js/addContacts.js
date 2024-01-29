let contacts = [
    {
        'name': 'Joe',
        'email': 'joel@test.de',
        'phone': '012312342'
    }
];

function openDialog() {
    document.getElementById('dialog').classList.remove('d-none');
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
}

function dontCloseCard(event) {
    event.stopPropagation();
}

function addToContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    contacts.push({ name: name.value, email: email.value, phone: phone.value });
    console.log('läuft');
}
