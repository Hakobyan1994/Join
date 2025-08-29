let contacts = [];
let contactIdCounter = 0;
let initials;
let initialsColor = 'white';
let contactInfoSliderVisible = false;
let loggedInUser = [];


// window.addEventListener('resize', resizeHandler);

/**
 * This function clears the existing content in the 'render-contacts' element, generates HTML for the main contacts, 
 * waits for the contacts to load asynchronously, and finally renders the contacts onto the page.
 * 
 */
async function renderContactsMain() {
    let content = document.getElementById('render-contacts');
    content.innerHTML = '';
    content.innerHTML = generateHtmlMainContacts();
    // await loadContacts();
    if (authToken !== null ||  asguest !== null) {
        await renderContacts();
    }
}
   
  async function getAllContacts(){
    const url = 'https://api.my-join-app.com/join_app/create_contacts/';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            contacts = data
        } else {
            console.error(' Fehler beim Abrufen:', data);
        }
    } catch (error) {
        console.error(' Netzwerkfehler:', error);
    } 
  }


/**
 * Renders the contacts into the contact page, arranging them alphabetically by their initials.
 * This function also adds an 'Add' button and handles the resizing of contact elements.
 * 
 */
async function renderContacts() {
    await getAllContacts();
    let addBtn = document.getElementById('addBtn');
    let contactsContainer = document.getElementById('allContacts');
    addContactBtnHTML(addBtn, contactsContainer);
    const predefinedOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    sortContacts(predefinedOrder);
    let lastLetter = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        lastLetter = renderContactImgInitials(lastLetter, contact, i, contactsContainer);
    }
    resizeHandler();
}

/**
 * This function sorts the contacts by their initials.
 * 
 * @param {string} predefinedOrder - These are the letters used to assign and sort the initials of the names.
 */
function sortContacts(predefinedOrder) {
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
}

/**
 * Handles the resizing of elements on the page based on the current window size.
 * 
 */
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

/**
 * Generates HTML content for the add contact button and inserts it into the specified button element.
 * Additionally, generates HTML content for the mobile version of the add contact button and inserts it
 * into the specified container element.
 *
 * @param {HTMLElement} addBtn - The HTML button element where the add contact button content will be inserted.
 * @param {HTMLElement} contactsContainer - The HTML element where the mobile version of the add contact button content will be inserted.
 */
function addContactBtnHTML(addBtn, contactsContainer) {
    addBtn.innerHTML = generateAddBtn();
    contactsContainer.innerHTML = generateAddBtnMobile();
}

/**
 * Renders the contact's image and initials into the contacts container, along with separators based on the initial letter of the contact's name.
 *
 * @param {string} lastLetter - The last letter processed during rendering to determine if a new separator is needed.
 * @param {object} contact - The contact object containing information like name and image.
 * @param {number} i - The index of the contact being rendered.
 * @param {HTMLElement} contactsContainer - The HTML element where the contacts are rendered.
 * @returns {string} The first letter of the current contact's name.
 */
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

/**
 * Adds initials to the contact's image and sets the image source using UI Avatars API.
 *
 * @param {object} contact - The contact object containing information like name and initials.
 * @param {string} imageId - The ID of the image element to which the initials will be added.
 */
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

/**
 * Displays the contact image for the specified index by setting its source and styling.
 *
 * @param {number} i - The index of the contact in the contacts array.
 */
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

/**
 * Generates a random color hex code based on the provided seed.
 *
 * @param {string} seed - The seed used to generate the random color.
 * @returns {string} A random color hex code.
 */
function getRandomColor(seed) {
    const letters = '0123456789ABCDEF';
    let color = '#';

    getRandomColorHELP(seed, letters, color);
    return color;
}

/**
 * Helper function to generate a random color hex code based on the provided seed or using a default random generation method.
 *
 * @param {string} seed - The seed used to generate the random color. If not provided, a random color will be generated.
 * @param {string} letters - The string containing hexadecimal characters used for color generation.
 * @param {string} color - The initial color value.
 */
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

/**
 * Applies a random background color to the specified image element based on the provided seed.
 *
 * @param {HTMLElement} imageElement - The image element to which the random background color will be applied.
 * @param {string} seed - The seed used to generate the random background color.
 */
function applyRandomColorToImage(imageElement, seed) {
    const randomColor = getRandomColor(seed);
    imageElement.style.backgroundColor = randomColor;
}

/**
 * Adds a new contact to the contacts array upon successful addition, clears input fields, closes the add contact slider,
 * updates the contacts in the local storage, reloads the contacts, and renders them on the page.
 *
 * @param {HTMLElement} nameInput - The input field for the contact's name.
 * @param {HTMLElement} emailInput - The input field for the contact's email.
 * @param {HTMLElement} phoneInput - The input field for the contact's phone number.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} formattedName - The formatted name of the contact.
 * @param {string} initials - The initials of the contact.
 */
async function addToContactsOnSuccess(nameInput, emailInput, phoneInput, name, email, phone, formattedName, initials) {
    addContactToArray(formattedName, email, phone, initials);
    clearInputs(nameInput, emailInput, phoneInput);
    closeAddContactSlider();
    // await setItem('contacts', JSON.stringify(contacts));
    await getAllContacts();
    await renderContacts();
    showSuccessMessage();
}

/**
 * Displays a success message upon successfully adding a contact, showing a success button slider.
 * The animation classes are determined based on the screen size.
 */
function showSuccessMessage() {
    let success = document.getElementById('successCon');
    let successMobile = document.getElementById('successConMobile');
    let isMobileView = window.innerWidth < 1360;

    if (isMobileView) {
        successMobile.classList.remove('d-none');
        successMobile.innerHTML = generateSuccessBtnSliderMobile();
        successMobile.classList.remove('slide-out-success-btn-mobile');
        successMobile.classList.add('slide-in-success-btn-mobile');
        setTimeoutSuccesDivMobile(successMobile);
    } else {
        success.classList.remove('d-none');
        success.innerHTML = generateSuccessBtnSlider();
        success.classList.remove('slide-out-success-btn');
        success.classList.add('slide-in-success-btn');
        setTimeoutSuccesDiv(success);
    }
}

/**
 * Sets a timeout to remove the success message by sliding it out and hiding it after a certain duration.
 * The animation classes are determined based on the screen size.
 * 
 * @param {HTMLElement} success - The success message container element.
 */
function setTimeoutSuccesDiv(success) {
    setTimeout(() => {
        success.classList.remove('slide-in-success-btn');
        success.classList.add('slide-out-success-btn');

        setTimeout(() => {
            success.classList.add('d-none');
        }, 500);
    }, 1500);
}

/**
 * Sets a timeout to remove the mobile success message by sliding it out and hiding it after a certain duration.
 * The animation classes are determined based on the screen size.
 * 
 * @param {HTMLElement} successMobile - The success message container element.
 */
function setTimeoutSuccesDivMobile(successMobile) {
    setTimeout(() => {
        successMobile.classList.remove('slide-in-success-btn-mobile');
        successMobile.classList.add('slide-out-success-btn-mobile');
        successMobile.classList.add('d-none');
    }, 1000);
}

/**
 * Adds a new contact object to the contacts array.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} initials - The initials of the contact.
 */
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

/**
 * Loads contact information for the specified contact index and populates the corresponding input fields.
 * 
 * @param {number} i - The index of the contact in the contacts array.
 */
function loadContactInfo(i) {
    let contact = contacts[i];
    let nameEdit = document.getElementById('nameEdit');
    let emailEdit = document.getElementById('emailEdit');
    let phoneEdit = document.getElementById('phoneEdit');
    nameEdit.value = contact.name;
    emailEdit.value = contact.email;
    phoneEdit.value = contact.phone;
}

/**
 * Deletes the contact at the specified index and updates the contact list.
 * 
 * @param {number} i - The index of the contact to be deleted.
 */
async function deleteContact(i) {
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let headlineMobile = document.getElementById('headlineMobile');
    let contactSlider = document.getElementById('contactSlider');
    deleteContactHELP(contactInfoConMobile, headlineMobile, i);
    // contactSlider.innerHTML = '';
    // closeEditContactSlider();
    // await setItem('contacts', JSON.stringify(contacts));
    // await setItem('tasks', JSON.stringify(tasks));  
    const url = `https://api.my-join-app.com/join_app/create_contacts/${contacts[i].id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        contacts.splice(i, 1); // Aus Liste entfernen
        renderContactsMain(); // Seite bleibt und aktualisiert nur den Bereich
    }


    // const data = await response.json();
    // contacts[i]=data
    // console.log(data)
    // deleteDeletedContact(i);
    // contacts.splice(i, 1);
    // await  renderContacts();
    // renderContactsMain()

}





/**
 * Removes the deleted contact from the assigned tasks.
 * 
 * @param {number} i - The index of the contact that was deleted.
 */
function deleteDeletedContact(i) {
    let contactName = contacts[i].name;
    let filter = contactName.trim().toUpperCase();
    for (let j = 0; j < tasks.length; j++) {
        const name = tasks[j].assignedTo;
        for (let k = 0; k < name.length; k++) {
            const assignedContact = name[k];
            let tasksName = assignedContact.trim().toUpperCase();
            if (!tasksName.indexOf(filter) > -1) {
                tasks[j].assignedTo.splice(k, 1);
                tasks[j].letter.splice(k, 1);
            }
        }
    }
}

/**
 * Hides or shows the contact information container and headline on mobile devices based on window width.
 * 
 * @param {HTMLElement} contactInfoConMobile - The container for contact information on mobile devices.
 * @param {HTMLElement} headlineMobile - The headline for contacts on mobile devices.
 * @param {number} i - The index of the contact being deleted.
 */
function deleteContactHELP(contactInfoConMobile, headlineMobile, i) {
    if (window.innerWidth < 860) {
        contactInfoConMobile.classList.add('d-none');
        headlineMobile.classList.add('d-none');
    } else {
        contactInfoConMobile.classList.remove('d-none');
        headlineMobile.classList.remove('d-none');
    }
}

/**
 * Renders contact information for a given contact index into the contact information slider.
 * 
 * @param {number} i - The index of the contact to render information for.
 * @param {HTMLElement} contactInfoSlider - The container for contact information slider.
 */
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