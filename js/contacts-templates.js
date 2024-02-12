function generateAddBtn() {
    return /*html*/`
        <button type="button" class="add-contact-btn" onclick="renderDialog()">
            Add new contact 
            <img src="/assets/img/icons/person_add.svg" alt="">
        </button>`;
}

function generateContact(i, contact, imageId) {
    return /*html*/`
        <div onclick="contactInfoSlider(${i})" class="contact-con-pos">
            <div class="contact-con">
                <img id="${imageId}" class="user-img-contact-list" src="/assets/img/icons/Ellipse 5.svg">
                <div>
                    <div class="contact-list-name">${contact.name}</div>
                    <div class="contact-list-email">${contact.email}</div>
                </div>
            </div>
        </div>`;
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
                            <div onclick="showEditMask(${i})" class="edit-delete">
                                <img src="/assets/img/icons/edit.svg" alt="">
                                    Edit
                            </div>
                            <div onclick="deleteContact(${i})" class="edit-delete">
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

function generateDialog() {
    return /*html*/`
        <div class="set-dialog-pos">
            <div class="dialog" onclick="dontCloseCard(event)">
            <div class="add-contact-main">
                <div class="set-position">
                    <img src="/assets/img/icons/Capa 2.svg" alt="join-icon">
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
                        <div onclick="closeDialog()" class="close-img-con">
                            <img class="close-img" src="/assets/img/icons/Close.svg" alt="">
                        </div>

                        <div class="add-contact-user-img">
                            <div class="person-con">
                                <img class="person-img-bgr" src="/assets/img/icons/Group 9.svg"
                                    alt="">
                                <img class="person-img-add-contacts" src="/assets/img/icons/person.svg" alt="">
                            </div>

                            <form onsubmit="addToContacts()" class="add-contact-data">
                                <div>
                                    <input id="name" name="name" class="input-con"
                                        placeholder="Name" type="text" maxlength="16" required>
                                    <img class="input-svg-pos" src="/assets/img/icons/person.svg"
                                        alt="">
                                </div>
                                <div>
                                    <input id="email" name="email" class="input-con"
                                        placeholder="Email" type="email" required>
                                    <img class="input-svg-pos" src="/assets/img/icons/mail.svg"
                                        alt="">
                                </div>
                                <div>
                                    <input id="phone" name="phone" class="input-con"
                                        placeholder="Phone" type="number" pattern="[0-9\s()+-]*" required>
                                    <img class="input-svg-pos" src="/assets/img/icons/call.svg"
                                        alt="">
                                </div>

                                <div class="add-contact-btns">
                                    <button type="button" class="cancel-btn" onclick="closeDialog()">
                                        Cancel <img class="cancel-btn-img" src="/assets/img/icons/Close.svg" alt="">
                                    </button>

                                    <button type="button" onclick="addToContacts()" class="create-contact-btn">
                                        Create contact <img src="/assets/img/icons/check.svg"
                                            alt="">
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

function generateEditMask(i) {
    return /*html*/`
        <div id="editMask" class="set-dialog-pos">
            <div class="dialog" onclick="dontCloseCard(event)">
                <div class="add-contact-main">
                    <div class="set-position">
                        <img src="/assets/img/icons/Capa 2.svg" alt="join-icon">
                        <div class="add-contact-headline">
                            Edit contact
                        </div>
                        <img class="blue-underline" src="/assets/img/icons/Vector 5.svg" alt="blue-underline">
                    </div>
                </div>

                <div class="contact-set">
                    <div class="add-contact-content set-position">
                        <div>
                            <div onclick="closeDialog()" class="close-img-con">
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
                                    </div>
                                    <div>
                                        <input id="emailEdit" name="email" class="input-con" placeholder="Email" type="email" required>
                                        <img class="input-svg-pos" src="/assets/img/icons/mail.svg" alt="">
                                    </div>
                                    <div>
                                        <input id="phoneEdit" name="phone" class="input-con" placeholder="Phone" type="number" pattern="[0-9\s()+-]*" required>
                                        <img class="input-svg-pos" src="/assets/img/icons/call.svg" alt="">
                                    </div>

                                    <div class="add-contact-btns">
                                        <button type="button" class="cancel-btn" onclick="deleteContact(${i})">Delete</button>
                                        <button type="button" onclick="saveContact(${i})" class="create-contact-btn">Save <img class="check-svg" src="/assets/img/icons/check.svg" alt=""></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}