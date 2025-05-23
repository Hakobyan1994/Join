/**
 * Generates HTML markup for the main contacts section.
 * 
 * @returns {string} The generated HTML markup.
 */
function generateHtmlMainContacts() {
    return /*html*/`
        <div id="mainContent" class="main-content">
            <div class="content">
                <div class="contacts-main">
                    <div id="addContactBtn" class="contacts">
                        <div id="addedContactsCon" class="added-contacts">

                            <div class="contact-con-btn">
                                <div id="addBtn" class="add-contact-btn-con"></div>

                                <div id="allContacts" class="all-contacts"></div>
                            </div>

                            <div id="darkBgr" class="dark-bgr d-none"></div>

                            <div id="addMask" class="d-none mobile-mask"></div>

                            <div id="editMask" class="d-non mobile-maske"></div>
                        </div>
                    </div>

                    <div id="contactOverlay"></div>

                    <div id="successCon"></div>
                    <div id="successConMobile"></div>

                    <div id="headline" class="headline">
                            Contacts
                            <div class="vertical-line">
                                <img class="line-contacts" src="../assets/img/icons/Vector 5 (1).svg" alt="">
                            </div>
                            <div class="team-headline">
                                Better with a team
                            </div>
                        </div>

                    <div id="headlineMobile" class="headline">
                            Contacts
                            <div class="vertical-line">
                                <img class="line-contacts" src="../assets/img/icons/Vector 5 (1).svg" alt="">
                            </div>
                            <div class="team-headline">
                                Better with a team
                            </div>
                        </div>

                    <div onclick="closeMobileMenu()" id="contactInfoConMobile" class="contact-info-con d-none">

                        <img onclick="hideMobileContactInfo()" class="back-arrow-mobile" src="../assets/img/icons/arrow_back_btn.svg">

                        <div id="contactInfoSlider" class="contact-info-slider"></div>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * Generates HTML markup for the mobile add contact button.
 * 
 * @returns {string} The generated HTML markup.
 */
function generateAddBtnMobile() {
    return /*html*/`
        <img id="addContactBtnMobile" onclick="showAddContactOverlay()" class="add-contact-btn-mobile" src="../assets/img/icons/add_contact_mobile.svg" alt="add-contact-mobile">`;
}

/**
 * Generates HTML markup for the add contact button.
 * 
 * @returns {string} The generated HTML markup.
 */
function generateAddBtn() {
    return /*html*/`
        <button type="button" class="add-contact-btn" onclick="showAddContactOverlay()">
            Add new contact 
            <img src="/assets/img/icons/person_add.svg" alt="">
        </button>`;
}

/**
 * Generates HTML markup for a contact.
 * 
 * @param {number} i - The index of the contact.
 * @param {object} contact - The contact object containing name and email.
 * @param {string} imageIdSlider - The id of the contact image element.
 * @returns {string} The generated HTML markup for the contact.
 */
function generateContact(i, contact, imageIdSlider) {
    return /*html*/`
    <div id="contactHighlighter" class="focus-main" >
        <div onclick="showContactInfoSlider(${i})" class="contact-con-pos">
            <div tabindex="0" class="contact-con"  onmouseover="addHighlight(this)" onmouseout="removeHighlight(this)">
                <img id="${imageIdSlider}" class="user-img-contact-list" src="../assets/img/icons/Ellipse 5.svg">
                <div class="contact-focus-effect">
                    <div class="contact-list-name">${contact.name}</div>
                    <div class="contact-list-email">${contact.email}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="scroll-con"></div>`;
}

/**
 * Generates HTML markup for a success button slider.
 * 
 * @returns {string} The generated HTML markup for the success button slider.
 */
function generateSuccessBtnSlider() {
    return /*html*/`
        <button class="success-btn">
            Contact successfully created
        </button>`;
}

/**
 * Generates HTML markup for a success mobile button slider.
 * 
 * @returns {string} The generated HTML markup for the success mobile button slider.
 */
function generateSuccessBtnSliderMobile() {
    return /*html*/`
        <button class="success-btn-mobile">
            Contact successfully created
        </button>`;
}

/**
 * Generates HTML markup for the contact information slider.
 * 
 * @param {number} i - The index of the contact.
 * @param {string} contactName - The name of the contact.
 * @param {string} contactEmail - The email of the contact.
 * @param {string} contactPhone - The phone number of the contact.
 * @param {string} imageId - The id of the contact image element.
 * @returns {string} The generated HTML markup for the contact information slider.
 */
function generateContactInfoSlider(i, contactName, contactEmail, contactPhone, imageId) {
    return /*html*/`
        <div id="contactSlider" class="contact-info-slider">
            <div class="slider-main-content">
                <div class="slider-content-top">
                    <img id="${imageId}" class="slider-contact-img" src="../assets/img/icons/Ellipse 5.svg" alt="">
                    <div class="contact-name">
                        <div class="name">${contactName}</div>
                        <div class="edit-delete-btn-con">
                            <div id="editBtnMobile" onclick="showEditContactOverlay(${i})" class="edit-delete">
                                <img src="../assets/img/icons/edit.svg" alt="">
                                    Edit
                            </div>
                            <div id="deleteBtnMobile" onclick="deleteContact(${i})" class="edit-delete">
                                <img src="../assets/img/icons/delete.svg" alt="">
                                    Delete
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slider-content-mid">
                    Contact Information
                </div>
                <div class="slider-content-bottom">
                    <div class="email-phone-con-main">
                        <div class="email-phone-con-top"><b>Email</b></div>
                        <div class="email-con-bottom">${contactEmail}</div>
                    </div>
                    <div class="email-phone-con-main">
                        <div class="email-phone-con-top"><b>Phone</b></div>
                        <div class="phone-con-bottom">${contactPhone}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <img id="openMobileMenuBtn" onclick="openMobileMenu(event)" class="contact-edit-btn-mobile" src="../assets/img/icons/add_contact_menu_mobile.svg">
        <div id="slideInMenuMobile" class="slide-in-menu-mobile d-none">
            <div class="mobile-menu-btns-main">
                <div onclick="showEditContactOverlay(${i})" class="mobile-menu-btns"><img class="mobile-edit-img" src="../assets/img/icons/edit.svg" alt=""><div class="edit-txt">Edit</div></div>
                <div onclick="deleteContact(${i})" class="mobile-menu-btns"><img class="mobile-delete-img" src="../assets/img/icons/delete.svg" alt="">Delete</div>
            </div>
        </div>`;
}

/**
 * Generates HTML markup for a letter container.
 * 
 * @param {string} currentLetter - The current letter to be displayed in the container.
 * @returns {string} The generated HTML markup for the letter container.
 */
function generateLetterCon(currentLetter) {
    return /*html*/`
        <div class="letter-con">
            ${currentLetter}
        </div>`;
}

/**
 * Generates SVG markup for a contact image with specified initials and background color.
 * 
 * @param {string} initials - The initials to be displayed on the contact image.
 * @param {string} color - The background color of the contact image.
 * @returns {string} The SVG markup for the contact image.
 */
function generateContactImage(initials, color) {
    return /*html*/`
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${color}"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="40">${initials}</text>
        </svg>`;
}

/**
 * Generates HTML markup for a separator line between contacts.
 * 
 * @returns {string} The HTML markup for the separator line.
 */
function generateSeparator() {
    return /*html*/`
        <div class="contact-line">
            <img class="contact-line-color" src="../assets/img/icons/Vector 10.svg" alt="">
        </div>`;
}

/**
 * Generates HTML markup for the add contact overlay.
 * 
 * @returns {string} The HTML markup for the add contact overlay.
 */
function generateAddContactOverlay() {
    return /*html*/`
        <div class="set-overlay-pos">
            <div class="add-contact-mask" onclick="dontCloseCard(event)">
            <div class="add-contact-main">
                <img id="closeImg" class="close-img-mobile" src="../assets/img/icons/close_white.svg" alt="" onclick="closeAddContactSlider()">
                <div class="set-position">
                    <img class="join-img" src="../assets/img/icons/Capa 2.svg" alt="join-icon">
                    <div class="add-contact-headline">
                        Add contact
                    </div>
                    <span class="add-contact-text">
                        Tasks are better with a team!
                    </span>
                    <img class="blue-underline" src="../assets/img/icons/Vector 5.svg"
                        alt="blue-underline">
                </div>
            </div>

            <div class="contact-set">
                <div class="add-contact-content" class="set-position">
                    <div>
                        <div onclick="closeAddContactSlider()" class="close-img-con">
                            <img id="closeImg" class="close-img" src="../assets/img/icons/Close.svg" alt="">
                        </div>
                        <div onclick="closeAddContactSlider()" class="close-img-con-mobile" style="display: none">
                        </div>

                        <div class="add-contact-user-img">
                            <div class="person-con">
                                <img class="person-img-bgr" src="../assets/img/icons/Group 9.svg"
                                    alt="">
                                <img class="person-img-add-contacts" src="../assets/img/icons/contact_person_white.svg" alt="">
                            </div>

                            <form onsubmit=" return addToContacts(event)"  class="add-contact-data">
                                <div class="input-con-main">
                                    <input id="name" name="name" class="input-con"
                                        placeholder="Name" type="text" maxlength="20" required>
                                    <img class="input-svg-pos" src="../assets/img/icons/person.svg" alt="">
                                    <div id="nameAddErrorMessage" class="error-message d-none"></div>
                                </div>
                                <div class="input-con-main">
                                    <input id="emailContacts" name="email" class="input-con"
                                        placeholder="Email" type="email" required>
                                    <img class="input-svg-pos" src="../assets/img/icons/mail.svg" alt="">
                                    <div id="emailAddErrorMessage" class="error-message d-none"></div>
                                    <div id="emailAlreadyExists" class="error-message d-none"></div>
                                </div>
                                <div class="input-con-main">
                                    <input id="phone" name="phone" class="input-con"
                                        placeholder="Phone" type="text" onkeypress="return onlyNumbers(event)" required>
                                    <img class="input-svg-pos" src="../assets/img/icons/call.svg" alt="">
                                    <div id="phoneAddErrorMessage" class="error-message d-none"></div>
                                </div>

                                <div class="add-contact-btns">
                                    <button id="cancelBtn" onmouseover="changeImage(true)" onmouseout="changeImage(false)" type="button" class="cancel-btn" onclick="closeAddContactSlider()">
                                        <div class="cancel-txt-fix">Cancel</div><img id="cancelBtnImg" class="cancel-btn-img" src="../assets/img/icons/close-black1.svg" alt="Close">
                                    </button>  

                                    <button type="button" onclick="addToContacts(event)"     class="create-contact-btn">
                                        Create contact <img src="../assets/img/icons/check1.svg"
                                            alt="crerate contact">
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

/**
 * Generates HTML markup for the edit contact overlay.
 * 
 * @param {number} i - The index of the contact to be edited.
 * @returns {string} The HTML markup for the edit contact overlay.
 */
function generateEditMaskOverlay(i) {
    return /*html*/`
        <div class="set-overlay-pos">
            <div class="add-contact-mask" onclick="dontCloseCard(event)">
                <div class="add-contact-main">
                <img id="closeImgEdit" class="close-img-mobile" src="../assets/img/icons/close_white.svg" alt="" onclick="closeEditContactSlider()">
                    <div class="set-position">
                        <img class="join-img" src="../assets/img/icons/Capa 2.svg" alt="join-icon">
                        <div class="add-contact-headline">
                            Edit contact
                        </div>
                        <img class="blue-underline" src="../assets/img/icons/Vector 5.svg" alt="blue-underline">
                    </div>
                </div>

                <div class="contact-set-edit">
                    <div class="add-contact-content set-position">
                        <div>
                            <div onclick="closeEditContactSlider()" class="close-img-con-edit">
                                <img class="close-img" src="../assets/img/icons/Close.svg" alt="">
                            </div>

                            <div class="add-contact-user-img">
                                <div class="person-con-edit">
                                    <img id="contactImageEdit" class="person-img">
                                </div>

                                <form onsubmit="addToContacts(event)" class="edit-contact-data">
                                    <div class="input-con-main">
                                        <input id="nameEdit" name="name" class="input-con-edit" placeholder="Name" type="text" maxlength="20" required>
                                        <img class="input-svg-pos-edit" src="../assets/img/icons/person.svg" alt="">
                                        <div id="nameErrorMessage" class="error-message d-none"></div>
                                    </div>
                                    <div class="input-con-main">
                                        <input id="emailEdit" name="email" class="input-con-edit" placeholder="Email" type="email" required>
                                        <img class="input-svg-pos-edit" src="../assets/img/icons/mail.svg" alt="">
                                        <div id="emailErrorMessage" class="error-message d-none"></div>
                                    </div>
                                    <div class="input-con-main">
                                        <input id="phoneEdit" name="phone" class="input-con-edit" placeholder="Phone" onkeypress="return onlyNumbers(event)" type="text" required>
                                        <img class="input-svg-pos-edit" src="../assets/img/icons/call.svg" alt="">
                                        <div id="phoneErrorMessage" class="error-message d-none"></div>
                                    </div>

                                    <div class="add-contact-btns">
                                        <button type="button" class="cancel-btn-edit" onclick="deleteContact(${i})">Delete</button>
                                        <button type="button" onclick="saveContact(${i})" class="create-contact-btn">Save <img class="check-svg" src="../assets/img/icons/check1.svg" alt=""></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}
