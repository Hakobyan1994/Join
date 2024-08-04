/**
 * Loads contacts data from storage and assigns it to the contacts array.
 * 
 * @returns {Promise<void>} - A promise that resolves when contacts data is successfully loaded.
 */
async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Error in loadContacts:', e);
    }
}

/**
 * Splits a name into parts, capitalizes the first letter of each part, and returns the formatted name.
 * 
 * @param {string} inputName - The name to be formatted.
 * @returns {string} The formatted name with each part capitalized.
 */
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

/**
 * Formats the initials of a name by taking the first letter of each part and capitalizing it.
 * 
 * @param {string} inputName - The name to extract initials from.
 * @returns {string} The formatted initials.
 */
function formatInitials(inputName) {
    let nameParts = inputName.trim().split(' ');
    let initials = '';

    for (let i = 0; i < nameParts.length; i++) {
        initials += nameParts[i].charAt(0).toUpperCase();
    }
    return initials;
}


/**
 * Applies a random color to the background of the specified image element based on the contact information.
 * 
 * @param {HTMLElement} imageElement - The image element to which the random color will be applied.
 * @param {object} contact - The contact information object containing details like name and initials.
 */
function addRandomColorToImg(imageElement, contact) {
    if (imageElement) {
        applyRandomColorToImage(imageElement, contact);
    }
}

/**
 * Allows only numeric input in an input field.
 * 
 * @param {Event} evt - The event object representing the key press event.
 * @returns {boolean} Returns true if the key press is a numeric character or a control key (backspace, arrow keys), otherwise returns false.
 */
function onlyNumbers(evt) {
    let charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 37 && charCode !== 39) {
        return false;
    }

    return true;
}

/**
 * Changes the image source of a button based on hover state.
 * 
 * @param {boolean} hovered - Indicates whether the button is being hovered over (true) or not (false).
 */
function changeImage(hovered) {
    if (hovered) {
        document.getElementById('cancelBtnImg').src = '../assets/img/icons/close-blue1.svg';
    } else {
        document.getElementById('cancelBtnImg').src = '../assets/img/icons/close-black1.svg';
    }
}

/**
 * Adds a CSS class to highlight a contact div.
 * 
 * @param {HTMLElement} contactDiv - The HTML element representing the contact div to be highlighted.
 */
function addHighlight(contactDiv) {
    contactDiv.classList.add('highlighted');
}

/**
 * Removes a CSS class to remove highlighting from a contact div.
 * 
 * @param {HTMLElement} contactDiv - The HTML element representing the contact div to remove highlighting from.
 */
function removeHighlight(contactDiv) {
    contactDiv.classList.remove('highlighted');
}

/**
 * Opens the mobile menu and prevents event propagation.
 * 
 * @param {Event} event - The event object triggered when opening the mobile menu.
 */
function openMobileMenu(event) {
    event.stopPropagation();

    let menuMobileCon = document.getElementById('slideInMenuMobile');
    menuMobileCon.classList.remove('d-none');
}

/**
 * Closes the mobile menu.
 * 
 */
function closeMobileMenu() {
    let menuMobileCon = document.getElementById('slideInMenuMobile');
    menuMobileCon.classList.add('d-none');
} 

/**
 * Prevents the event from closing the card.
 * 
 * @param {Event} event - The event object.
 */
function dontCloseCard(event) {
    event.stopPropagation();
}

/**
 * Prevents the event from propagating further.
 * 
 * @param {Event} event - The event object.
 */
function preventEventPropagation(event) {
    event.stopPropagation();
}

/**
 * Clears the value of input fields.
 * 
 * @param {HTMLInputElement} name - The input field for the name.
 * @param {HTMLInputElement} email - The input field for the email.
 * @param {HTMLInputElement} phone - The input field for the phone number.
 */
function clearInputs(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}

/**
 * Checks for the presence of a specific HTML element ('addedContactsCon') and adds or removes
 * an event listener for window resize accordingly.
 * 
 */
function checkResize() {
    let div = document.getElementById('addedContactsCon');

    if (div) {
        window.addEventListener('resize', resizeHandler);
    } else {
        window.removeEventListener('resize', resizeHandler);
    }
}