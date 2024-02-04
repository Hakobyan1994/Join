function generateContactList(addedContact) {
    return /*html*/`
    <div class="letter-con">
        A
    </div>
    <div class="contact-line">
        <img class="contact-line-color" src="/assets/img/icons/Vector 10.svg" alt="">
    </div>
        <div class="contact-con-pos">
            <div class="contact-con">
                <img class="user-img-contact-list" src="/assets/img/icons/Ellipse 5.svg" alt="">
                <div>
                    <div class="contact-list-name">${addedContact.name}</div>
                    <div class="contact-list-email">${addedContact.email}</div>
                </div>
            </div>
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
                            <img class="person-img" src="/assets/img/icons/person.svg" alt="">
                        </div>

                        <form onsubmit="addToContacts()" class="add-contact-data">
                            <div>
                                <input id="name" name="name" class="input-con"
                                    placeholder="Name" type="text" required>
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
                                    Cancel <img src="/assets/img/icons/Close.svg" alt="">
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