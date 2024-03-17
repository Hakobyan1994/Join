function generateHtmlMainContacts() {
    return /*html*/`
        <div id="mainContent" class="main-content">
            <div class="content">
                <div class="contacts-main">
                    <div id="addContactBtn" class="contacts">
                        <div class="added-contacts">

                            <div class="contact-con-btn">
                                <div id="addBtn" class="add-contact-btn-con"></div>

                                <div id="allContacts" class="all-contacts"></div>
                            </div>

                            <div class="dialog-bg d-none" id="dialogBg"></div>

                            <div id="dialog" class="dialog-bg d-none"></div>

                            <div id="editMask" class="dialog-bg d-none"></div>
                        </div>
                    </div>

                    <div id="contactOverlay"></div>

                    <div onclick="closeMobileMenu()" id="contactInfoConMobile" class="contact-info-con d-none">
                        <img onclick="openMobileMenu(event)" class="contact-edit-btn-mobile" src="../assets/img/icons/add_contact_menu_mobile.svg">
                        <div id="slideInMenuMobile" class="slide-in-menu-mobile d-none">
                            <div class="mobile-menu-btns-main">
                                <div onclick="showEditContactOverlay(i)" class="mobile-menu-btns"><img class="mobile-edit-img" src="../assets/img/icons/edit.svg" alt=""><div class="edit-txt">Edit</div></div>
                                <div onclick="deleteContact(i)" class="mobile-menu-btns"><img class="mobile-delete-img" src="../assets/img/icons/delete.svg" alt="">Delete</div>
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

                        <img onclick="hideMobileContactInfo()" class="back-arrow-mobile" src="../assets/img/icons/arrow_back_btn.svg">

                        <div id="contactInfoSlider" class="contact-info-slider"></div>

                        <div id="successCon"></div>
                    </div>
                </div>
            </div>
        </div>  
    `;
}


function generateAddBtn() {
    return /*html*/`
        <button type="button" class="add-contact-btn" onclick="showAddContactOverlay()">
            Add new contact 
            <img src="/assets/img/icons/person_add.svg" alt="">
        </button>`;
}


function generateContact(i, contact, imageIdSlider) {
    return /*html*/`
    <div id="contactHighlighter" class="focus-main" >
        <div onclick="showContactInfoSlider(${i})" class="contact-con-pos">
            <div tabindex="0" class="contact-con"  onmouseover="addHighlight(this)" onmouseout="removeHighlight(this)">
                <img id="${imageIdSlider}" class="user-img-contact-list" src="/assets/img/icons/Ellipse 5.svg">
                <div class="contact-focus-effect">
                    <div class="contact-list-name">${contact.name}</div>
                    <div class="contact-list-email">${contact.email}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="scroll-con"></div>`;
}


function generateSuccessBtnSlider() {
    return /*html*/`
        <button class="success-btn">
            Contact successfully created
        </button>`;
}


function generateContactInfoSlider(i, contactName, contactEmail, contactPhone, imageId) {
    return /*html*/`
        <div id="contactSlider" class="contact-info-slider">
            <div class="slider-main-content">
                <div class="slider-content-top">
                    <img id="${imageId}" class="slider-contact-img" src="/assets/img/icons/Ellipse 5.svg" alt="">
                    <div class="contact-name">
                        <div class="name">${contactName}</div>
                        <div class="edit-delete-btn-con">
                            <div id="editBtnMobile" onclick="showEditContactOverlay(${i})" class="edit-delete">
                                <img src="/assets/img/icons/edit.svg" alt="">
                                    Edit
                            </div>
                            <div id="deleteBtnMobile" onclick="deleteContact(${i})" class="edit-delete">
                                <img src="/assets/img/icons/delete.svg" alt="">
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
        </div>`;
}


function generateLetterCon(currentLetter) {
    return /*html*/`
        <div class="letter-con">
            ${currentLetter}
        </div>`;
}


function generateContactImage(initials, color) {
    return /*html*/`
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${color}"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="40">${initials}</text>
        </svg>`;
}


function generateSeparator() {
    return /*html*/`
        <div class="contact-line">
            <img class="contact-line-color" src="/assets/img/icons/Vector 10.svg" alt="">
        </div>`;
}


function generateAddContactOverlay() {
    return /*html*/`
        <div class="set-dialog-pos">
            <div class="dialog" onclick="dontCloseCard(event)">
            <div class="add-contact-main">
                <div class="set-position">
                    <img class="join-img" src="/assets/img/icons/Capa 2.svg" alt="join-icon">
                    <div class="add-contact-headline">
                        Add contact
                    </div>
                    <span class="add-contact-text">
                        Tasks are better with a team!
                    </span>
                    <img class="blue-underline" src="/assets/img/icons/Vector 5.svg"
                        alt="blue-underline">
                </div>
            </div>

            <div class="contact-set">
                <div class="add-contact-content" class="set-position">
                    <div>
                        <div onclick="closeAddContactSlider()" class="close-img-con">
                            <img id="closeImg" class="close-img" src="/assets/img/icons/Close.svg" alt="">
                        </div>
                        <div class="close-img-con">
                            <img id="closeImgMobile" onclick="closeAddContactSlider()" class="close-img-mobile" src="/assets/img/icons/close_white.svg" alt="">
                        </div>

                        <div class="add-contact-user-img">
                            <div class="person-con">
                                <img class="person-img-bgr" src="/assets/img/icons/Group 9.svg"
                                    alt="">
                                <img class="person-img-add-contacts" src="/assets/img/icons/contact_person_white.svg" alt="">
                            </div>

                            <form onsubmit="addToContacts()" class="add-contact-data">
                                <div class="input-con-main">
                                    <input id="name" name="name" class="input-con"
                                        placeholder="Name" type="text" maxlength="16" required>
                                    <img class="input-svg-pos" src="/assets/img/icons/person.svg" alt="">
                                    <div id="nameAddErrorMessage" class="error-message d-none"></div>
                                </div>
                                <div class="input-con-main">
                                    <input id="emailContacts" name="email" class="input-con"
                                        placeholder="Email" type="email" required>
                                    <img class="input-svg-pos" src="/assets/img/icons/mail.svg" alt="">
                                    <div id="emailAddErrorMessage" class="error-message d-none"></div>
                                    <div id="emailAlreadyExists" class="error-message d-none"></div>
                                </div>
                                <div class="input-con-main">
                                    <input id="phone" name="phone" class="input-con"
                                        placeholder="Phone" type="text" onkeypress="return onlyNumbers(event)" required>
                                    <img class="input-svg-pos" src="/assets/img/icons/call.svg" alt="">
                                    <div id="phoneAddErrorMessage" class="error-message d-none"></div>
                                </div>

                                <div class="add-contact-btns">
                                    <button id="cancelBtn" onmouseover="changeImage(true)" onmouseout="changeImage(false)" type="button" class="cancel-btn" onclick="closeAddContactSlider()">
                                        <div class="cancel-txt-fix">Cancel</div><img id="cancelBtnImg" class="cancel-btn-img" src="/assets/img/icons/close-black1.svg" alt="Close">
                                    </button>

                                    <button type="button" onclick="addToContacts()" class="create-contact-btn">
                                        Create contact <img src="/assets/img/icons/check1.svg"
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


function generateEditMaskOverlay(i) {
    return /*html*/`
        <div id="editMask" class="set-dialog-pos">
            <div class="dialog" onclick="dontCloseCard(event)">
                <div class="add-contact-main">
                    <div class="set-position">
                        <img class="join-img" src="/assets/img/icons/Capa 2.svg" alt="join-icon">
                        <div class="add-contact-headline">
                            Edit contact
                        </div>
                        <img class="blue-underline" src="/assets/img/icons/Vector 5.svg" alt="blue-underline">
                    </div>
                </div>

                <div class="contact-set-edit">
                    <div class="add-contact-content set-position">
                        <div>
                            <div onclick="closeEditContactSlider()" class="close-img-con-edit">
                                <img class="close-img" src="/assets/img/icons/Close.svg" alt="">
                            </div>

                            <div class="add-contact-user-img">
                                <div class="person-con">
                                    <img id="contactImageEdit" class="person-img">
                                </div>

                                <form onsubmit="addToContacts()" class="add-contact-data">
                                    <div>
                                        <input id="nameEdit" name="name" class="input-con" placeholder="Name" type="text" maxlength="16" required>
                                        <img class="input-svg-pos" src="/assets/img/icons/person.svg" alt="">
                                        <div id="nameErrorMessage" class="error-message d-none"></div>
                                    </div>
                                    <div>
                                        <input id="emailEdit" name="email" class="input-con" placeholder="Email" type="email" required>
                                        <img class="input-svg-pos" src="/assets/img/icons/mail.svg" alt="">
                                        <div id="emailErrorMessage" class="error-message d-none"></div>
                                    </div>
                                    <div>
                                        <input id="phoneEdit" name="phone" class="input-con" placeholder="Phone" onkeypress="return onlyNumbers(event)" type="text" required>
                                        <img class="input-svg-pos" src="/assets/img/icons/call.svg" alt="">
                                        <div id="phoneErrorMessage" class="error-message d-none"></div>
                                    </div>

                                    <div class="add-contact-btns">
                                        <button type="button" class="cancel-btn" onclick="deleteContact(${i})">Delete</button>
                                        <button type="button" onclick="saveContact(${i})" class="create-contact-btn">Save <img class="check-svg" src="/assets/img/icons/check1.svg" alt=""></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}