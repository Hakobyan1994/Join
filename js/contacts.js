let contacts = [];
let contactIdCounter = 0;
let initials;
let initialsColor = 'white';
let contactInfoSliderVisible = false;


async function renderContactsMain() {
    let content = document.getElementById('render-contacts');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainContacts();
    await loadContacts();
    renderContacts();
}


function preventEventPropagation(event) {
    event.stopPropagation();
}


function renderContacts() {
    let contactsContainer = document.getElementById('allContacts');
    contactsContainer.innerHTML = '<img id="addContactBtnMobile" onclick="showAddContactOverlay()" class="add-contact-btn-mobile" src="../assets/img/icons/add_contact_mobile.svg" alt="add-contact-mobile">';
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    let addBtn = document.getElementById('addBtn');
    addBtn.innerHTML = generateAddBtn();

    let lastLetter = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        lastLetter = renderContactImgInitials(lastLetter, contact, i, contactsContainer);
    }
}


function renderContactImgInitials(lastLetter, contact, i, contactsContainer) {
    if (contact.name && contact.name.length > 0) {
        const firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== lastLetter) {
            contactsContainer.innerHTML += generateLetterCon(firstLetter) + generateSeparator();
        }

        const imageId = `contactImage${i}`;
        const contactHtml = generateContact(i, contact, imageId);

        contactsContainer.innerHTML += contactHtml;
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
        imageElement.src = `https://ui-avatars.com/api/?name=${contact.initials}&background=random&color=ffffff`;
        applyRandomColorToImage(imageElement, initials);
    }
}


function displayContactImage(i) {
    let contact = contacts[i];
    let contactImage = document.getElementById('contactImageEdit');

    if (contactImage) {
        contactImage.src = `https://ui-avatars.com/api/?name=${contact.initials}&background=random&color=ffffff`;
        contactImage.style.width = '100px';
        contactImage.style.height = '100px';
        contactImage.style.backgroundColor = 'transparent';
        contactImage.alt = contact.initials;
    }
}


function getRandomColor(seed) {
    const letters = '0123456789ABCDEF';
    let color = '#';

    getRandomColorHELP(seed, letters, color);

    return color;
}


function getRandomColorHELP(seed, letters, color) {
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
}


function applyRandomColorToImage(imageElement, seed) {
    const randomColor = getRandomColor(seed);
    imageElement.style.backgroundColor = randomColor;
}


function addToContacts() {
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('emailContacts');
    let phoneInput = document.getElementById('phone');

    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();

    let nameAddContactError = document.getElementById('nameAddErrorMessage');
    let emailAddContactError = document.getElementById('emailAddErrorMessage');
    let phoneAddContactError = document.getElementById('phoneAddErrorMessage');

    addToContactsCheckValues(nameAddContactError, emailAddContactError, phoneAddContactError, name, email, phone, nameInput, emailInput, phoneInput);
}


function addToContactsCheckValues(nameAddContactError, emailAddContactError, phoneAddContactError, name, email, phone, nameInput, emailInput, phoneInput) {
    if (!name) {
        nameAddContactError.classList.remove('d-none');
        nameAddContactError.innerHTML = `Please enter a name`;
    } else {
        nameAddContactError.classList.add('d-none');
    }

    if (!phone) {
        phoneAddContactError.classList.remove('d-none');
        phoneAddContactError.innerHTML = `Please enter a phone number`;
    } else {
        phoneAddContactError.classList.add('d-none');
    }

    setTimeout(() => {
        if (!email || !isValidEmail(email)) {
            emailAddContactError.classList.remove('d-none');
            emailAddContactError.innerHTML = !email ? `Please enter an email` : `Please enter a valid email`;
        } else {
            emailAddContactError.classList.add('d-none');
        }
    }, 200);

    if (!name || !email || !phone) {
        return;
    }
    checkInputs(nameInput, emailInput, phoneInput, name, email, phone);
}



function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}


function checkInputs(nameInput, emailInput, phoneInput, name, email, phone) {
    let formattedName = splitNameAndCapitalize(name);
    let initials = formatInitials(formattedName);
    let existingEmail = document.getElementById('emailAlreadyExists');

    checkInputsHELP(existingEmail, email);

    addToContactsOnSuccess(nameInput, emailInput, phoneInput, name, email, phone, formattedName, initials);
}


function checkInputsHELP(existingEmail, email) {
    if (checkExistingEmail(email)) {
        existingEmail.classList.remove('d-none');
        existingEmail.innerHTML = `Email already exists`;
        return;
    } else {
        existingEmail.classList.add('d-none');
    }
}


function checkExistingEmail(email) {
    return contacts.some(contact => contact.email === email);
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


function addedContactSuccessfully() {
    let success = document.getElementById('successCon');
    success.innerHTML = generateSuccessBtnSlider();
    success.classList.remove('slide-out-success-btn');
    success.classList.add('slide-in-success-btn');

    setTimeout(() => {
        success.classList.remove('slide-in-success-btn');
        success.classList.add('slide-out-success-btn');

        setTimeout(() => {
            success.classList.add('d-none');
        }, 500);
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
        'initialsColor': initialsColor,
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
    let nameEditContactError = document.getElementById('nameErrorMessage');
    let emailEditContactError = document.getElementById('emailErrorMessage');
    let phoneEditContactError = document.getElementById('phoneErrorMessage');
    contact.name = contactName;
    contact.email = contactEmail;
    contact.phone = contactPhone;

    saveContactCheckValues(nameEditContactError, emailEditContactError, phoneEditContactError, contactName, contactEmail, contactPhone, i);
}


function saveContactCheckValues(nameEditContactError, emailEditContactError, phoneEditContactError, contactName, contactEmail, contactPhone, i) {
    if (!contactName.trim()) {
        nameEditContactError.classList.remove('d-none');
        nameEditContactError.innerHTML = `Please enter a name`;
    } else {
        nameEditContactError.classList.add('d-none');
    }

    setTimeout(() => {
        if (!contactEmail.trim() || !isValidEmail(contactEmail)) {
            emailEditContactError.classList.remove('d-none');
            emailEditContactError.innerHTML = `Please enter a valid email`;
        } else {
            emailEditContactError.classList.add('d-none');
        }
    }, 200);

    if (contactEmail && !contactEmail.includes('@')) {
        emailEditContactError.classList.remove('d-none');
        emailEditContactError.innerHTML = `Please enter a valid email address`;
        return;
    }

    if (!contactPhone.trim()) {
        phoneEditContactError.classList.remove('d-none');
        phoneEditContactError.innerHTML = `Please enter a phone number`;
    } else {
        phoneEditContactError.classList.add('d-none');
    }

    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
        return;
    }
    saveContactHelp(i, contacts);
}


async function saveContactHelp(i, contacts) {
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    closeEditContactSlider();
    showContactInfoSlider(i);
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
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let infoSliderHeadline = document.getElementById('headlineMobile');

    showAddContactOverlayHELP(dialog, contactInfoConMobile, infoSliderHeadline);
    showAddContactSlider();
}


function showAddContactOverlayHELP(dialog, contactInfoConMobile, infoSliderHeadline) {
    if (window.innerWidth > 1360) {
        dialog.classList.remove('slide-out');
        dialog.classList.remove('d-none');
        dialog.classList.add('slide-in');
        dialog.innerHTML = generateAddContactOverlay();
    } else {
        dialog.classList.remove('slide-out-mobile');
        dialog.classList.remove('d-none');
        dialog.classList.add('slide-in-mobile');
        contactInfoConMobile.classList.remove('z-index-minus-1');
        infoSliderHeadline.classList.remove('z-index-minus-1');
        dialog.innerHTML = generateAddContactOverlay();
    }
}


function showEditContactOverlay(i) {
    let editMask = document.getElementById('editMask');
    let editMobileBtn = document.getElementById('openMobileMenuBtn');
    let contactInfoSliderMobile = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let infoSliderHeadline = document.getElementById('headlineMobile');
    let contactList = document.getElementById('allContacts');
    let addNewContactBtn = document.getElementById('addBtn');

    showEditContactOverlayHELP(i, editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn);
    editMask.innerHTML = generateEditMaskOverlay(i);
    showAddContactSlider(i);
    loadContactInfo(i);
    displayContactImage(i);
}


function showEditContactOverlayHELP(i, editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn) {
    if (window.innerWidth > 1360) {
        editMask.classList.remove('slide-out');
        editMask.classList.remove('d-none');
        editMask.classList.add('slide-in');
    } else {
        editMask.classList.remove('slide-out-mobile');
        editMask.classList.remove('d-none');
        editMask.classList.add('slide-in-mobile');
        editMobileBtn.classList.add('d-none');
        contactInfoSliderMobile.classList.add('d-none');
        contactInfoConMobile.classList.add('z-index-minus-2');
        infoSliderHeadline.classList.add('d-none');
        editMask.innerHTML = generateEditMaskOverlay(i);
    }
}


function closeAddContactSlider() {
    let dialog = document.getElementById('dialog');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let infoSliderHeadline = document.getElementById('headlineMobile');

    closeAddContactSliderHELP(dialog, contactInfoConMobile, infoSliderHeadline);

    setTimeout(() => {
        dialog.classList.add('d-none');
        hideAddContactSlider();
    }, 200);
}


function closeAddContactSliderHELP(dialog, contactInfoConMobile, infoSliderHeadline) {
    if (window.innerWidth > 1360) {
        dialog.classList.remove('slide-in');
        dialog.classList.add('slide-out');
    } else {
        dialog.classList.remove('slide-in-mobile');
        dialog.classList.add('slide-out-mobile');
        contactInfoConMobile.classList.remove('z-index-minus-1');
        infoSliderHeadline.classList.remove('z-index-minus-1');
    }
}


function closeEditContactSlider() {
    let editMask = document.getElementById('editMask');
    let editMobileBtn = document.getElementById('openMobileMenuBtn');
    let contactInfoSliderMobile = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let infoSliderHeadline = document.getElementById('headlineMobile');
    let contactList = document.getElementById('allContacts');
    let addNewContactBtn = document.getElementById('addBtn');

    closeEditContactSliderHELP(editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn);

    setTimeout(() => {
        editMask.classList.add('d-none');
        hideAddContactSlider();
    }, 200);
}


function closeEditContactSliderHELP(editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn) {
    if (window.innerWidth > 1360) {
        editMask.classList.remove('slide-in');
        editMask.classList.add('slide-out');
        editMask.classList.add('d-none');
        // infoSliderHeadline.classList.add('z-index-minus-1');
        // contactList.classList.add('d-none');
    } else {
        editMask.classList.remove('slide-in-mobile');
        editMask.classList.add('slide-out-mobile');
        editMobileBtn.classList.remove('d-none');
        contactInfoSliderMobile.classList.remove('d-none');
        contactInfoConMobile.classList.remove('z-index-minus-1');
        infoSliderHeadline.classList.remove('z-index-minus-1');
        contactList.classList.remove('d-none');
        addNewContactBtn.classList.remove('d-none');
        editMask.classList.add('d-none');
    }
}


function showAddContactSlider() {
    document.getElementById('dialogBg').classList.remove('hide-dialog-bg');
    document.getElementById('dialogBg').classList.remove('d-none');
    document.getElementById('dialogBg').classList.add('dialog-bg');
    document.getElementById('contactInfoSlider').classList.add('show');
    addZindex();
}


function hideAddContactSlider() {
    document.getElementById('dialogBg').classList.add('hide-dialog-bg');
    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('dialogBg').classList.remove('dialog-bg');
    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('contactInfoSlider').classList.remove('show');
    document.getElementById('navbar').classList.remove('z-11');
    document.getElementById('mobile-header').classList.remove('z-12');
    removeZindex();
}


function loadContactInfo(i) {
    document.getElementById('nameEdit').value = contacts[i].name;
    document.getElementById('emailEdit').value = contacts[i].email;
    document.getElementById('phoneEdit').value = contacts[i].phone;
}


async function deleteContact(i) {
    if (window.innerWidth < 860) {
        document.getElementById('contactInfoConMobile').classList.add('d-none');
        document.getElementById('headlineMobile').classList.add('d-none');
    } else {
        document.getElementById('contactInfoConMobile').classList.remove('d-none');
        document.getElementById('headlineMobile').classList.remove('d-none');
    }

    contacts.splice(i, 1);
    document.getElementById('contactSlider').innerHTML = '';
    closeEditContactSlider();
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}


function showContactInfoSlider(i) {
    document.getElementById('headlineMobile').classList.remove('d-none');
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    contactInfoConMobile.classList.remove('d-none');
    document.getElementById('headlineMobile').classList.add('z-index');

    if (window.innerWidth < 860) {
        // document.getElementById('addedContactsCon').classList.add('z-index-minus-1');
        document.getElementById('headlineMobile').classList.remove('z-index');
        document.getElementById('headlineMobile').classList.add('z-index-2');
        document.getElementById('headlineMobile').classList.remove('z-index-minus-1');
        contactInfoSlider.classList.remove('z-index-minus-1');
        contactInfoConMobile.classList.remove('z-index-minus-2');
    }

    showContactInfoSliderHELP(i, contactInfoSlider);
    renderContactInfo(i, contactInfoSlider);
}


function showContactInfoSliderHELP(i, contactInfoSlider) {
    if (window.innerWidth < 1360) {
        contactInfoSlider.innerHTML = '';
        contactInfoSlider.classList.remove('d-none');
        contactInfoSlider.classList.add('z-index-999');
        contactInfoSlider.classList.add('slide-in');
        contactInfoSliderVisible = true;
    } else {
        contactInfoSlider.innerHTML = '';
        contactInfoSlider.classList.remove('d-none');
        contactInfoSlider.classList.add('slide-in');
        contactInfoSliderVisible = true;
    }
}


function renderContactInfo(i, contactInfoSlider) {
    let contact = contacts[i];
    let contactName = contact.name;
    let contactEmail = contact.email;
    let contactPhone = contact.phone;
    let imageIdSlider = `contactImageSlider`;
    let imageElement = document.getElementById(imageIdSlider);
    contactInfoSlider.innerHTML = generateContactInfoSlider(i, contactName, contactEmail, contactPhone, imageIdSlider);
    addInitialsToContactImage(contact, imageIdSlider);
    addRandomColorToImg(imageElement, contact);
}


function addRandomColorToImg(imageElement, contact) {
    if (imageElement) {
        applyRandomColorToImage(imageElement, contact);
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


function addHighlight(contactDiv) {
    contactDiv.classList.add('highlighted');
}


function removeHighlight(contactDiv) {
    contactDiv.classList.remove('highlighted');
}


function hideMobileContactInfo() {
    document.getElementById('contactInfoConMobile').classList.add('d-none');
    document.getElementById('headlineMobile').classList.remove('z-index-1');
    document.getElementById('headlineMobile').classList.add('d-none');
}


function openMobileMenu(event) {
    event.stopPropagation();

    let menuMobileCon = document.getElementById('slideInMenuMobile');
    menuMobileCon.classList.remove('d-none');
}


function closeMobileMenu() {
    let menuMobileCon = document.getElementById('slideInMenuMobile');
    menuMobileCon.classList.add('d-none');
} 