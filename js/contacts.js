let contacts = [];
let contactIdCounter = 0;
let initials;
let initialsColor = 'white';
let contactInfoSliderVisible = false;
let loggedInUser = [];


async function renderContactsMain() {
    let content = document.getElementById('render-contacts');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainContacts();
    await loadContacts();
    renderContacts();
}


function renderContacts() {
    let addBtn = document.getElementById('addBtn');
    let contactsContainer = document.getElementById('allContacts');
    addContactBtnHTML(addBtn, contactsContainer);
    const predefinedOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    contacts.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        const indexA = predefinedOrder.indexOf(nameA.charAt(0).toUpperCase());
        const indexB = predefinedOrder.indexOf(nameB.charAt(0).toUpperCase());

        if (indexA === -1) {
            return 1;
        }
        if (indexB === -1) {
            return -1;
        }
        return indexA - indexB;
    });

    let lastLetter = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        lastLetter = renderContactImgInitials(lastLetter, contact, i, contactsContainer);
    }
resizeHandler();
}


function resizeHandler() {
    let headline = document.getElementById('headline');
    let headlineMobile = document.getElementById('headlineMobile');
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let isMobileView = window.innerWidth < 1360;
    let isMobileViewIphone = window.innerWidth < 860;
    let contactInfoSliderVisible = contactInfoSlider.classList.contains('show');

    refreshInfoSliderOnScreenSize(headline, headlineMobile, contactInfoSlider, contactInfoConMobile, isMobileView, isMobileViewIphone, contactInfoSliderVisible);
}


function checkResize() {
    let div = document.getElementById('addedContactsCon');

    if (div) {
        window.addEventListener('resize', resizeHandler);
    } else {
        window.removeEventListener('resize', resizeHandler);
    }
}


function addContactBtnHTML(addBtn, contactsContainer) {
    addBtn.innerHTML = generateAddBtn();
    contactsContainer.innerHTML = generateAddBtnMobile();
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
    setTimeoutSuccesDiv(success);
}


function setTimeoutSuccesDiv(success) {
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


async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Error in loadContacts:', e);
    }
}


function loadContactInfo(i) {
    let contact = contacts[i];
    let nameEdit = document.getElementById('nameEdit');
    let emailEdit = document.getElementById('emailEdit');
    let phoneEdit = document.getElementById('phoneEdit');
    nameEdit.value = contact.name;
    emailEdit.value = contact.email;
    phoneEdit.value = contact.phone;
}


async function deleteContact(i) {
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let headlineMobile = document.getElementById('headlineMobile');
    let contactSlider = document.getElementById('contactSlider');
    deleteContactHELP(contactInfoConMobile, headlineMobile, i);
    deleteDeletedContact(i);
    contacts.splice(i, 1);
    contactSlider.innerHTML = '';
    closeEditContactSlider();
    await setItem('contacts', JSON.stringify(contacts));
    await setItem('tasks', JSON.stringify(tasks));
    renderContacts();
}


function deleteDeletedContact(i) {
    let contactName = contacts[i].name;
    let filter = contactName.trim().toUpperCase();
    for (let j = 0; j < tasks.length; j++) {
        const name = tasks[j].assigned;
        for (let k = 0; k < name.length; k++) {
            const assignedContact = name[k];
            let tasksName = assignedContact.trim().toUpperCase();
            if (!tasksName.indexOf(filter) > -1) {
                tasks[j].assigned.splice(k, 1);
                tasks[j].letter.splice(k, 1);
            }
        }
    }
}


function deleteContactHELP(contactInfoConMobile, headlineMobile, i) {
    if (window.innerWidth < 860) {
        contactInfoConMobile.classList.add('d-none');
        headlineMobile.classList.add('d-none');
    } else {
        contactInfoConMobile.classList.remove('d-none');
        headlineMobile.classList.remove('d-none');
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