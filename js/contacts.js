let contacts = [];
let contactIdCounter = 0;
let initials;
let contactInfoSliderVisible = false;
let dialogVisible = false;
let editMaskVisible = false;
let contactColors = ['#FF5733', '#FFD700', '#FF33FF', '#FFC300', '#00BFFF',
    '#FF6347', '#6A5ACD', '#32CD32', '#FF4500', '#8A2BE2',
    '#1E90FF', '#FF69B4', '#FF8C00', '#9400D3', '#DC143C',
    '#FF1493', '#00FF7F', '#4682B4', '#BA55D3', '#D2691E',
    '#FFD700', '#32CD32', '#00CED1', '#20B2AA', '#FF8C00',
    '#7CFC00', '#6495ED', '#48D1CC', '#7B68EE', '#9932CC',
    '#FF00FF', '#8B4513', '#87CEEB', '#F08080', '#20B2AA',
    '#FA8072', '#9370DB', '#4169E1', '#87CEFA', '#778899',
    '#6495ED', '#40E0D0', '#00FF00', '#9370DB', '#800080',
    '#8B0000', '#4B0082', '#FF00FF', '#00FA9A', '#4169E1'];

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
        imageElement.src = `https://ui-avatars.com/api/?name=${initials}&background=random&color=#ffffff`;
        applyRandomColorToImage(imageElement, initials);
    }
}

function getRandomColor(seed) {
    const colors = contactColors;
    let index = 0;
    if (seed && seed.length > 0) {
        for (let i = 0; i < seed.length; i++) {
            index += seed.charCodeAt(i);
        }
        index = index % colors.length;
    } else {
        index = Math.floor(Math.random() * colors.length);
    }
    return colors[index];
}

function applyRandomColorToImage(imageElement, seed) {
    const randomColor = getRandomColor(seed);
    imageElement.style.backgroundColor = randomColor;
}

function dontCloseCard(event) {
    event.stopPropagation();
}

function renderDialog() {
    let dialog = document.getElementById('dialog');

    if (dialogVisible) {
        dialog.classList.remove('slide-in');
        dialogVisible = false;
        dialog.classList.add('slide-out');
        dialog.addEventListener('animationend', function () {
            dialog.classList.add('d-none');
        }, { once: true });
    } else {
        dialog.classList.remove('d-none');
        dialog.classList.add('slide-in');
        dialogVisible = true;
        dialog.innerHTML = generateDialog();
    }
    showAddContactSlider();
}

async function showEditMask(i) {
    let editMask = document.getElementById('editMask');

    if (editMaskVisible) {
        editMask.classList.remove('slide-in');
        editMaskVisible = false;
        editMask.classList.add('slide-out');
        editMask.addEventListener('animationend', function () {
            editMask.classList.add('d-none');
        }, { once: true });
    } else {
        editMask.classList.remove('d-none');
        editMask.classList.add('slide-in');
        editMaskVisible = true;
        editMask.innerHTML = generateEditMask(i);
        loadContactInfo(i);
        displayContactImage(i);
    }
    showAddContactSlider();
}

function closeDialog() {
    let dialog = document.getElementById('dialog');
    let editMask = document.getElementById('editMask');

    if (dialogVisible) {
        dialog.classList.remove('slide-in');
        dialogVisible = false;
        dialog.classList.add('slide-out');
        dialog.addEventListener('animationend', function () {
            dialog.classList.add('d-none');
        }, { once: true });
    }
    if (editMaskVisible) {
        editMask.classList.remove('slide-in');
        editMaskVisible = false;
        editMask.classList.add('slide-out');
        editMask.addEventListener('animationend', function () {
            editMask.classList.add('d-none');
        }, { once: true });
    }
    hideAddContactSlider();
    dialogVisible = false;
    editMaskVisible = false;
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
    contactInfoSlider.classList.remove('d-none');
    contactInfoSlider.classList.add('slide-in');
    contactInfoSliderVisible = true;

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

    contactInfoSlider.dataset.contactId = i;
}

function showAddContactSlider() {
    document.getElementById('dialogBg').classList.remove('d-none');
    document.getElementById('contactInfoSlider').classList.add('show');
}

function hideAddContactSlider() {
    document.getElementById('dialogBg').classList.add('hide-dialog-bg');
    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('dialogBg').classList.remove('dialog-bg');
    document.getElementById('contactInfoSlider').classList.remove('show');
    document.getElementById('dialogBg').classList.add('d-none');

}

function addedContactSuccessfully() {
    let success = document.getElementById('successCon');
    success.innerHTML = `
        <button class="success-pos">
            Contact successfully created
        </button>`;

    success.classList.remove('d-none');
    success.classList.remove('slide-out-success');
    success.classList.add('slide-in-success');

    setTimeout(() => {
        success.classList.remove('slide-in-success');
        success.classList.add('slide-out-success');

        setTimeout(() => {
            success.classList.add('d-none');
        }, 500);
    }, 2000);
}
