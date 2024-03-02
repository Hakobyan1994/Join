
let contacts = [];
let contactIdCounter = 0;
let initials;
let contactInfoSliderVisible = false;


function renderContacts() {
    let contactsContainer = document.getElementById('allContacts');
    contactsContainer.innerHTML = '';
    // contacts.sort((a, b) => a.name.localeCompare(b.name));

    let addBtn = document.getElementById('addBtn');
    addBtn.innerHTML = generateAddBtn();

    let lastLetter = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        lastLetter = renderContactImgInitials(lastLetter, contact, i, contactsContainer);
    }

    loadSelectedPage();
}



function renderContactImgInitials(lastLetter, contact, i, contactsContainer) {
    if (contact.name && contact.name.length > 0) {
        const firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== lastLetter) {
            contactsContainer.innerHTML += generateLetterCon(firstLetter) + generateSeparator();
        }

        const imageId = `contactImage${i}`;
        contactsContainer.innerHTML += generateContact(i, contact, imageId);
        addInitialsToContactImage(contact, imageId);

        return firstLetter;
    }

    return lastLetter;
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
        imageElement.src = `https://ui-avatars.com/api/?name=${initials}&background=random&color=ffffff`;
        applyRandomColorToImage(imageElement, initials);
    }
}


function displayContactImage(i) {
    let contact = contacts[i];
    let contactImage = document.getElementById('contactImageEdit');
    if (contactImage) {
        contactImage.src = `https://ui-avatars.com/api/?name=${initials}&background=random&color=ffffff`;
        contactImage.style.width = '100px';
        contactImage.style.height = '100px';
        contactImage.style.backgroundColor = 'transparent';
        contactImage.alt = contact.initials;
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


function addToContacts() {
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');

    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();

    checkInputs(nameInput, emailInput, phoneInput, name, email, phone);
}


function checkInputs(nameInput, emailInput, phoneInput, name, email, phone) {
    if (!validateInputs(name, email, phone)) {
        return;
    }

    let formattedName = splitNameAndCapitalize(name);
    let initials = formatInitials(formattedName);

    if (checkExistingEmail(email)) {
        alert('A contact with this email already exists.');
        return;
    }
    addToContactsOnSuccess(nameInput, emailInput, phoneInput, name, email, phone, formattedName, initials);
}


function validateInputs(name, email, phone) {
    if (!/^[a-zA-Z\s]*$/.test(name)) {
        alert('Name should contain only letters.');
        return false;
    }

    if (!email.includes('@')) {
        alert('Invalid email address.');
        return false;
    }

    if (!/^\d+$/.test(phone)) {
        alert('Phone number should contain only numbers.');
        return false;
    }

    if (name === '' || email === '' || phone === '') {
        alert('Please fill in all fields.');
        return false;
    }

    return true;
}


async function addToContactsOnSuccess(nameInput, emailInput, phoneInput, name, email, phone, formattedName, initials) {
    addContactToArray(formattedName, email, phone, initials);
    clearInputs(nameInput, emailInput, phoneInput);
    closeAddContactSlider();
    await setItem('contacts', JSON.stringify(contacts));
    await loadContacts();
    renderContacts();
    addedContactSuccessfully();
}


function checkExistingEmail(email) {
    return contacts.some(contact => contact.email === email);
}


function addedContactSuccessfully() {
    let success = document.getElementById('successCon');
    success.innerHTML = generateSuccessBtnSlider();
    success.classList.remove('slide-out-success-btn');
    success.classList.add('slide-in-success-btn');

    setTimeout(() => {
        success.classList.remove('slide-in-success-btn');
        success.classList.add('slide-out-success-btn');
    }, 1500);
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
        'initialsColor': 'white',
        'contactImg': contactImg,
        'color': randomColor
    };
    contacts.push(contact);
}


function saveContact(i) {
    let contact = contacts[i];
    let contactName = document.getElementById('nameEdit').value;
    let contactEmail = document.getElementById('emailEdit').value;
    let contactPhone = document.getElementById('phoneEdit').value;

    contact.name = contactName;
    contact.email = contactEmail;
    contact.phone = contactPhone;

    saveContactHelp(i, contacts)
}


async function saveContactHelp(i, contacts) {
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();

    closeEditContactSlider();
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


function dontCloseCard(event) {
    event.stopPropagation();
}


function showAddContactOverlay() {
    let dialog = document.getElementById('dialog');
    dialog.classList.remove('slide-out');
    dialog.classList.remove('d-none');
    dialog.classList.add('slide-in');
    dialog.innerHTML = generateAddContactOverlay();
    showAddContactSlider();
}


function showEditContactOverlay(i) {
    let editMask = document.getElementById('editMask');
    editMask.classList.remove('slide-out');
    editMask.classList.remove('d-none');
    editMask.classList.add('slide-in');
    editMask.innerHTML = generateEditMaskOverlay(i);
    showAddContactSlider();
    loadContactInfo(i);
    displayContactImage(i);
}


function closeAddContactSlider() {
    let dialog = document.getElementById('dialog');
    dialog.classList.remove('slide-in');
    dialog.classList.add('slide-out');

    setTimeout(() => {
        dialog.classList.add('d-none');
        hideAddContactSlider();
    }, 200);
}


function closeEditContactSlider() {
    let editMask = document.getElementById('editMask');
    editMask.classList.remove('slide-in');
    editMask.classList.add('slide-out');

    setTimeout(() => {
        editMask.classList.add('d-none');
        hideAddContactSlider();
    }, 200);
}


function showAddContactSlider() {
    document.getElementById('dialogBg').classList.remove('hide-dialog-bg');
    document.getElementById('dialogBg').classList.remove('d-none');
    document.getElementById('dialogBg').classList.add('dialog-bg');
    document.getElementById('contactInfoSlider').classList.add('show');
}


function hideAddContactSlider() {
    document.getElementById('dialogBg').classList.add('hide-dialog-bg');
    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('dialogBg').classList.remove('dialog-bg');
    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('contactInfoSlider').classList.remove('show');
}


function loadContactInfo(i) {
    document.getElementById('nameEdit').value = contacts[i].name;
    document.getElementById('emailEdit').value = contacts[i].email;
    document.getElementById('phoneEdit').value = contacts[i].phone;
}


async function deleteContact(i) {
    contacts.splice(i, 1);
    document.getElementById('contactSlider').innerHTML = '';
    closeEditContactSlider();
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}


function showContactInfoSlider(i) {
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    contactInfoSlider.innerHTML = '';
    contactInfoSlider.classList.remove('d-none');
    contactInfoSlider.classList.add('slide-in');
    contactInfoSliderVisible = true;

    renderContactInfo(i, contactInfoSlider);
}


function renderContactInfo(i, contactInfoSlider) {
    let contact = contacts[i];
    let contactName = contact.name;
    let contactEmail = contact.email;
    let contactPhone = contact.phone;
    let imageId = `contactImageSlider`;
    let imageElement = document.getElementById(imageId);
    contactInfoSlider.innerHTML = generateContactInfoSlider(i, contactName, contactEmail, contactPhone, imageId);
    addInitialsToContactImage(contact, imageId);
    addRandomColorToImg(imageElement, contact);
    contactInfoSlider.dataset.contactId = i;
}


function addRandomColorToImg(imageElement, contact) {
    if (imageElement) {
        applyRandomColorToImage(imageElement, contact.initials);
    }
}


function onlyNumbers(evt) {
    let charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 37 && charCode !== 39) {
        return false;
    }

    return true;
}


function changeImage(hovered) {
    if (hovered) {
        document.getElementById('cancelBtnImg').src = '../assets/img/icons/close-blue1.svg';
    } else {
        document.getElementById('cancelBtnImg').src = '../assets/img/icons/close-black1.svg';
    }
}