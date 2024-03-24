function showAddContactOverlay() {
    let dialog = document.getElementById('dialog');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let isMobileView = window.innerWidth < 1360;

    showAddContactOverlayHELP(dialog, contactInfoConMobile, isMobileView);
}


function showAddContactOverlayHELP(dialog, contactInfoConMobile, isMobileView) {
    if (isMobileView === true) {
        dialog.classList.remove('slide-out-mobile');
        dialog.classList.remove('d-none');
        dialog.classList.add('slide-in-mobile');
        contactInfoConMobile.classList.remove('z-index-minus-1');
    }
    else if (isMobileView === false) {
        dialog.classList.remove('slide-in-mobile');
        dialog.classList.remove('slide-out');
        dialog.classList.remove('d-none');
        dialog.classList.add('slide-in');
    }
    dialog.innerHTML = generateAddContactOverlay();
    showAddContactSlider();
}


function showAddContactSlider() {
    let dialogBg = document.getElementById('dialogBg');
    let contactInfoSlider = document.getElementById('contactInfoSlider');

    dialogBg.classList.remove('hide-dialog-bg');
    dialogBg.classList.remove('d-none');
    dialogBg.classList.add('dialog-bg');
    contactInfoSlider.classList.add('show');
    addZindex();
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
    let contactInfoSlider = document.getElementById('contactSlider');
    let infoSliderHeadline = document.getElementById('headlineMobile');
    let isMobileView = window.innerWidth < 1360;

    closeAddContactSliderHELP(dialog, contactInfoConMobile, infoSliderHeadline, isMobileView, contactInfoSlider);
    closeAddNewContactSliderTimeout(dialog);
}


function closeAddNewContactSliderTimeout(dialog) {
    setTimeout(() => {
        dialog.classList.add('d-none');
        hideAddContactSlider();
    }, 200);
}


function closeAddContactSliderHELP(dialog, contactInfoConMobile, infoSliderHeadline, isMobileView, contactInfoSlider) {
    if (isMobileView) {
        dialog.classList.remove('slide-in-mobile');
        dialog.classList.add('slide-out-mobile');
        contactInfoConMobile.classList.remove('z-index-minus-1');
        infoSliderHeadline.classList.remove('z-index-minus-1');
        contactInfoMobileTimeout(contactInfoSlider);
    }
    else {
        dialog.classList.remove('slide-in-mobile');
        dialog.classList.remove('slide-in');
        dialog.classList.add('slide-out');
    }
}


function contactInfoMobileTimeout(contactInfoSlider) {
    setTimeout(() => {
        contactInfoSlider.classList.remove('d-none');
    }, 200);
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


function hideAddContactSlider() {
    let dialogBg = document.getElementById('dialogBg');
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    let navbar = document.getElementById('navbar');
    let mobileHeader = document.getElementById('mobile-header');

    dialogBg.classList.add('hide-dialog-bg');
    dialogBg.classList.add('d-none');
    dialogBg.classList.remove('dialog-bg');
    dialogBg.classList.add('d-none');
    contactInfoSlider.classList.remove('show');
    navbar.classList.remove('z-11');
    mobileHeader.classList.remove('z-12');
    removeZindex();
}


function showContactInfoSlider(i) {
    let headline = document.getElementById('headline');
    let headlineMobile = document.getElementById('headlineMobile');
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    contactInfoConMobile.classList.remove('d-none');

    function updateContactInfoSlider() {
        let isMobileView = window.innerWidth < 1360;

        if (window.innerWidth < 860) {
            headlineMobile.classList.add('z-index-2');
            headlineMobile.classList.remove('z-index-minus-1');
            contactInfoSlider.classList.remove('z-index-minus-1');
            contactInfoConMobile.classList.remove('z-index-minus-2');
        }

        showContactInfoSliderHELP(i, contactInfoSlider, isMobileView, headline, headlineMobile);
        renderContactInfo(i, contactInfoSlider);
    }

    updateContactInfoSlider(); 

    window.addEventListener('resize', updateContactInfoSlider); 
}


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


function hideMobileContactInfo() {
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    let headlineMobile = document.getElementById('headlineMobile');
    let dialogBg = document.getElementById('dialog');

    headlineMobile.classList.remove('z-index-2');
    dialogBg.classList.remove('slide-in');
    contactInfoConMobile.classList.remove('slide-in');
    contactInfoConMobile.classList.add('d-none');
    headlineMobile.classList.remove('z-index-1');
}