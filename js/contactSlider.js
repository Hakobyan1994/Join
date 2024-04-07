/**
 * Displays the overlay for adding a new contact, including the mask, contact info container, dark background, navbar, and header.
 * 
 */
function showAddContactOverlay() {
    let addMask = document.getElementById('addMask');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let darkBgr = document.getElementById('darkBgr');
    let navbar = document.getElementById('navbar');
    let header = document.getElementById('mobile-header');
    let isMobileView = window.innerWidth < 1360;

    darkBgr.classList.remove('d-none');
    darkBgr.classList.remove('hide-dark-bgr');
    showAddContactSlider();
    showAddContactOverlayHELP(addMask, contactInfoConMobile, isMobileView, navbar, header);
}

/**
 * Helper function to control the display of the overlay for adding a new contact based on the viewport size and other elements.
 *
 * @param {HTMLElement} addMask - The mask element.
 * @param {HTMLElement} contactInfoConMobile - The container for mobile contact information.
 * @param {boolean} isMobileView - Indicates whether the viewport is in mobile view.
 * @param {HTMLElement} navbar - The navbar element.
 * @param {HTMLElement} header - The header element.
 */
function showAddContactOverlayHELP(addMask, contactInfoConMobile, isMobileView, navbar, header) {
    addZindexContacts();
    if (isMobileView) {
        addMask.classList.remove('slide-out-mobile');
        addMask.classList.remove('d-none');
        addMask.classList.add('slide-in-mobile');
        contactInfoConMobile.classList.remove('z-index-minus-1');
        contactInfoConMobile.classList.add('d-none');
        addMask.innerHTML = generateAddContactOverlay();
    } else {
        addZindexContacts();
        addMask.classList.remove('slide-in-mobile');
        addMask.classList.remove('slide-out-mobile');
        addMask.classList.remove('slide-out-mask');
        addMask.classList.remove('d-none');
        addMask.classList.add('slide-in-mask');
        contactInfoConMobile.classList.add('d-none');
        addMask.innerHTML = generateAddContactOverlay();
    }
}

/**
 * Shows the slider for adding a new contact by adding appropriate classes to the elements.
 * 
 */
function showAddContactSlider() {
    let addMask = document.getElementById('addMask');
    let darkBgr = document.getElementById('darkBgr');
    let contactInfoSlider = document.getElementById('contactInfoSlider');

    if (darkBgr.classList.contains('hide-dark-bgr')) {
        darkBgr.classList.remove('hide-dark-bgr');
    }
    if (darkBgr.classList.contains('d-none')) {
        darkBgr.classList.remove('d-none');
    }
    contactInfoSlider.classList.add('show');
    darkBgr.classList.add('dark-bgr');
}

/**
 * Shows the overlay for editing a contact by adding appropriate classes to the elements and loading contact information.
 *
 * @param {number} i - The index of the contact to edit.
 */
function showEditContactOverlay(i) {
    let editMask = document.getElementById('editMask');
    let editMobileBtn = document.getElementById('openMobileMenuBtn');
    let contactInfoSliderMobile = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let infoSliderHeadline = document.getElementById('headlineMobile');
    let contactList = document.getElementById('allContacts');
    let addNewContactBtn = document.getElementById('addBtn');
    let isMobileView = window.innerWidth < 1360;

    showEditContactOverlayHELP(i, editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn, isMobileView);
    editMask.innerHTML = generateEditMaskOverlay(i);
    showAddContactSlider(i);
    loadContactInfo(i);
    displayContactImage(i);
}

/**
 * Helper function to configure the elements for showing the overlay for editing a contact.
 *
 * @param {number} i - The index of the contact to edit.
 * @param {HTMLElement} editMask - The HTML element representing the edit mask.
 * @param {HTMLElement} editMobileBtn - The HTML element representing the mobile edit button.
 * @param {HTMLElement} contactInfoSliderMobile - The HTML element representing the mobile contact info slider.
 * @param {HTMLElement} contactInfoConMobile - The HTML element representing the mobile contact info container.
 * @param {HTMLElement} infoSliderHeadline - The HTML element representing the headline of the info slider.
 * @param {HTMLElement} contactList - The HTML element representing the list of contacts.
 * @param {HTMLElement} addNewContactBtn - The HTML element representing the button for adding a new contact.
 * @param {boolean} isMobileView - A boolean indicating whether the current view is mobile or not.
 */
function showEditContactOverlayHELP(i, editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn, isMobileView) {
    addZindexContacts();
    if (isMobileView) {
        editMask.classList.remove('slide-in-mask');
        editMask.classList.remove('slide-in-mobile');
        editMask.classList.remove('slide-out-mobile');
        editMask.classList.remove('d-none');
        editMask.classList.add('slide-in-mobile');
        editMobileBtn.classList.add('d-none');
        contactInfoSliderMobile.classList.add('d-none');
        contactInfoConMobile.classList.add('z-index-minus-2');
        infoSliderHeadline.classList.add('d-none');
        editMask.innerHTML = generateEditMaskOverlay(i);
    } else {
        editMask.classList.remove('slide-out-mask');
        editMask.classList.remove('slide-in-mobile');
        editMask.classList.remove('slide-out-mobile');
        editMask.classList.remove('d-none');
        editMask.classList.add('slide-in-mask');
        contactInfoConMobile.classList.add('z-index-minus-2');
    }
}

/**
 * Closes the add contact slider and resets the related UI elements.
 * 
 */
function closeAddContactSlider() {
    let addMask = document.getElementById('addMask');
    let contactInfoSlider = document.getElementById('contactSlider');
    let infoSliderHeadline = document.getElementById('headlineMobile');
    let darkBgr = document.getElementById('darkBgr');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let infoSlider = document.getElementById('contactInfoSlider');
    let isMobileView = window.innerWidth < 1360;

    closeAddContactSliderHELP(infoSlider, addMask, contactInfoConMobile, infoSliderHeadline, isMobileView, contactInfoSlider, darkBgr);
    hideAddContactSlider();
}

/**
 * Helper function to close the add contact slider and reset related UI elements.
 * 
 * @param {HTMLElement} infoSlider - The contact info slider element.
 * @param {HTMLElement} addMask - The overlay mask for the add contact slider.
 * @param {HTMLElement} contactInfoConMobile - The container for contact information on mobile view.
 * @param {HTMLElement} infoSliderHeadline - The headline of the contact info slider on mobile view.
 * @param {boolean} isMobileView - Indicates whether the current view is mobile or not.
 * @param {HTMLElement} contactInfoSlider - The contact info slider element.
 * @param {HTMLElement} darkBgr - The dark background element.
 */
function closeAddContactSliderHELP(infoSlider, addMask, contactInfoConMobile, infoSliderHeadline, isMobileView, contactInfoSlider, darkBgr) {
    removeZindexContacts();
    if (isMobileView) {
        darkBgr.classList.add('hide-dark-bgr');
        darkBgr.classList.add('d-none');
        darkBgr.classList.remove('dark-bgr');
        addMask.classList.add('slide-out-mobile');
        addMask.classList.remove('slide-in-mask')
        addMask.classList.remove('slide-in-mobile');
        contactInfoConMobile.classList.add('d-none');
        infoSliderHeadline.classList.remove('z-index-minus-1');
        // addMask.classList.add('d-none');
    } else {
        addMask.classList.remove('slide-in-mobile');
        addMask.classList.remove('slide-in-mask');
        addMask.classList.add('slide-out-mask');
        // addMask.classList.add('d-none');
    }
    hideAddContactSlider();
}

/**
 * Closes the edit contact slider and resets related UI elements.
 * 
 */
function closeEditContactSlider() {
    let editMask = document.getElementById('editMask');
    let editMobileBtn = document.getElementById('openMobileMenuBtn');
    let contactInfoSliderMobile = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let headline = document.getElementById('headline');
    let infoSliderHeadline = document.getElementById('headlineMobile');
    let contactList = document.getElementById('allContacts');
    let addNewContactBtn = document.getElementById('addBtn');
    let isMobileView = window.innerWidth < 1360;

    closeEditContactSliderHELP(editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn, headline, isMobileView);
    timeoutEditSlider(editMask);
}

/**
 * Sets a timeout to hide the edit slider after a delay.
 *
 * @param {HTMLElement} editMask - The HTML element representing the edit slider.
 */
function timeoutEditSlider(editMask) {
    setTimeout(() => {
        editMask.classList.add('d-none');
        hideAddContactSlider();
    }, 250);
}

/**
 * Closes the edit contact slider and adjusts the interface elements accordingly based on the view mode.
 *
 * @param {HTMLElement} editMask - The HTML element representing the edit slider.
 * @param {HTMLElement} editMobileBtn - The HTML element representing the mobile button for opening the menu.
 * @param {HTMLElement} contactInfoSliderMobile - The HTML element representing the contact info slider in mobile view.
 * @param {HTMLElement} contactInfoConMobile - The HTML element representing the contact info container in mobile view.
 * @param {HTMLElement} infoSliderHeadline - The HTML element representing the headline of the info slider.
 * @param {HTMLElement} contactList - The HTML element representing the list of contacts.
 * @param {HTMLElement} addNewContactBtn - The HTML element representing the button for adding a new contact.
 * @param {HTMLElement} headline - The HTML element representing the headline of the page.
 * @param {boolean} isMobileView - Indicates whether the current view is in mobile mode.
 */
function closeEditContactSliderHELP(editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn, headline, isMobileView) {
    removeZindexContacts();
    if (isMobileView) {
        editMask.classList.add('slide-out-mobile');
        editMobileBtn.classList.remove('d-none');
        contactInfoSliderMobile.classList.remove('d-none');
        contactInfoConMobile.classList.remove('z-index-minus-1');
        infoSliderHeadline.classList.remove('z-index-minus-1');
        contactList.classList.remove('d-none');
        addNewContactBtn.classList.remove('d-none');
        headline.classList.remove('d-none');
    } else {
        editMask.classList.remove('slide-in-mask');
        editMask.classList.add('slide-out-mask');
        contactInfoConMobile.classList.remove('z-index-minus-2');
    }
}

/**
 * Hides the add contact slider and adjusts the visibility of interface elements.
 * 
 */
function hideAddContactSlider() {
    let darkBgr = document.getElementById('darkBgr');
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    let navbar = document.getElementById('navbar');
    let mobileHeader = document.getElementById('mobile-header');

    darkBgr.classList.add('hide-dark-bgr');
    darkBgr.classList.add('d-none');
    darkBgr.classList.remove('dark-bgr');
    contactInfoSlider.classList.remove('show');
    navbar.classList.remove('z-11');
    mobileHeader.classList.remove('z-12');
}

/**
 * Displays the contact information slider with details of the contact at the specified index.
 *
 * @param {number} i - The index of the contact to display information for.
 */
function showContactInfoSlider(i) {
    let headline = document.getElementById('headline');
    let headlineMobile = document.getElementById('headlineMobile');
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    contactInfoConMobile.classList.remove('d-none');
    let isMobileView = window.innerWidth < 1360;

    updateContactInfoSlider(i, headline, headlineMobile, contactInfoSlider, contactInfoConMobile, isMobileView);
}

/**
 * Updates and displays the contact information slider with details of the contact at the specified index.
 *
 * @param {number} i - The index of the contact to display information for.
 * @param {HTMLElement} headline - The headline element for desktop view.
 * @param {HTMLElement} headlineMobile - The headline element for mobile view.
 * @param {HTMLElement} contactInfoSlider - The container element for the contact information slider.
 * @param {HTMLElement} contactInfoConMobile - The container element for the contact information in mobile view.
 * @param {boolean} isMobileView - Indicates if the current view is mobile or not.
 */
function updateContactInfoSlider(i, headline, headlineMobile, contactInfoSlider, contactInfoConMobile, isMobileView) {
    if (window.innerWidth < 860) {
        headlineMobile.classList.add('z-index-2');
        headlineMobile.classList.remove('z-index-minus-1');
        contactInfoSlider.classList.remove('z-index-minus-1');
        contactInfoConMobile.classList.remove('z-index-minus-2');
    }
    showContactInfoSliderHELP(i, contactInfoSlider, isMobileView, headline, headlineMobile);
    renderContactInfo(i, contactInfoSlider);
}

/**
 * Displays the contact information slider based on the current view mode.
 *
 * @param {number} i - The index of the contact.
 * @param {HTMLElement} contactInfoSlider - The container element for the contact information slider.
 * @param {boolean} isMobileView - Indicates if the current view is mobile or not.
 * @param {HTMLElement} headline - The headline element for desktop view.
 * @param {HTMLElement} headlineMobile - The headline element for mobile view.
 */
function showContactInfoSliderHELP(i, contactInfoSlider, isMobileView, headline, headlineMobile) {
    if (isMobileView === true) {
        contactInfoSlider.innerHTML = '';
        headlineMobile.classList.remove('d-none');
        headline.classList.add('d-none');
        contactInfoSlider.classList.remove('d-none');
        contactInfoSlider.classList.add('z-index-999');
        contactInfoSlider.classList.add('slide-in');
        contactInfoSliderVisible = true;
    } else if (isMobileView === false) {
        contactInfoSlider.innerHTML = '';
        headlineMobile.classList.add('d-none');
        headline.classList.remove('d-none');
        contactInfoSlider.classList.remove('d-none');
        contactInfoSlider.classList.add('slide-in');
        contactInfoSliderVisible = true;
    }
}

/**
 * Hides the mobile contact information display.
 * 
 */
function hideMobileContactInfo() {
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let headlineMobile = document.getElementById('headlineMobile');
    let addMask = document.getElementById('addMask');

    headlineMobile.classList.remove('z-index-2');
    addMask.classList.remove('slide-in');
    contactInfoConMobile.classList.remove('slide-in');
    contactInfoConMobile.classList.add('d-none');
    headlineMobile.classList.remove('z-index-1');
    headlineMobile.classList.add('d-none');
}

/**
 * Refreshes the information slider based on the screen size and visibility.
 * 
 * @param {HTMLElement} headline - The headline element for desktop view.
 * @param {HTMLElement} headlineMobile - The headline element for mobile view.
 * @param {HTMLElement} contactInfoSlider - The contact information slider element.
 * @param {HTMLElement} contactInfoConMobile - The container for contact information in mobile view.
 * @param {boolean} isMobileView - Indicates if the current view is mobile.
 * @param {boolean} isMobileViewIphone - Indicates if the current view is on an iPhone.
 * @param {boolean} contactInfoSliderVisible - Indicates if the contact information slider is visible.
 */
function refreshInfoSliderOnScreenSize(headline, headlineMobile, contactInfoSlider, contactInfoConMobile, isMobileView, isMobileViewIphone, contactInfoSliderVisible) {
    refreshMobileView(isMobileView, contactInfoSliderVisible, headline, headlineMobile);
    refreshMobileViewIphone(isMobileViewIphone, headlineMobile);
    refreshMobileViewIphoneAndIfVisible(contactInfoSliderVisible, isMobileViewIphone, headlineMobile, contactInfoSlider, contactInfoConMobile);
}

/**
 * Refreshes the visibility of the headline elements based on the mobile view and the visibility of the contact information slider.
 * 
 * @param {boolean} isMobileView - Indicates if the current view is mobile.
 * @param {boolean} contactInfoSliderVisible - Indicates if the contact information slider is visible.
 * @param {HTMLElement} headline - The headline element for desktop view.
 * @param {HTMLElement} headlineMobile - The headline element for mobile view.
 */
function refreshMobileView(isMobileView, contactInfoSliderVisible, headline, headlineMobile) {
    if (isMobileView && !contactInfoSliderVisible) {
        headline.classList.add('d-none');
        headlineMobile.classList.remove('d-none');
    } else {
        headline.classList.remove('d-none');
        headlineMobile.classList.add('d-none');
    }
}

/**
 * Refreshes the z-index of the mobile headline element based on the mobile view.
 * 
 * @param {boolean} isMobileViewIphone - Indicates if the current view is on an iPhone.
 * @param {HTMLElement} headlineMobile - The headline element for mobile view.
 */
function refreshMobileViewIphone(isMobileViewIphone, headlineMobile) {
    if (isMobileViewIphone) {
        headlineMobile.classList.add('z-index-2');
        headlineMobile.classList.remove('z-index-minus-2');
    } else {
        headlineMobile.classList.remove('z-index-minus-2');
    }
}

/**
 * Refreshes the visibility of mobile elements based on the current iPhone view and the visibility of the contact info slider.
 * 
 * @param {boolean} contactInfoSliderVisible - Indicates if the contact info slider is visible.
 * @param {boolean} isMobileViewIphone - Indicates if the current view is on an iPhone.
 * @param {HTMLElement} headlineMobile - The headline element for mobile view.
 * @param {HTMLElement} contactInfoSlider - The contact info slider element.
 * @param {HTMLElement} contactInfoConMobile - The container for mobile contact information.
 */
function refreshMobileViewIphoneAndIfVisible(contactInfoSliderVisible, isMobileViewIphone, headlineMobile, contactInfoSlider, contactInfoConMobile) {
    if (!contactInfoSliderVisible && isMobileViewIphone) {
        headlineMobile.classList.add('d-none');
        contactInfoSlider.classList.add('d-none');
        contactInfoConMobile.classList.add('d-none');
    }
}