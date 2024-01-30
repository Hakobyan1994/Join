function slideInAddContact() {
    document.getElementById('dialog').classList.remove('d-none');
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
}

function dontCloseCard(event) {
    event.stopPropagation();
}


