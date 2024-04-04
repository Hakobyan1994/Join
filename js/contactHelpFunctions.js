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