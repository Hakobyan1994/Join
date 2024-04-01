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


function showAddContactOverlayHELP(addMask, contactInfoConMobile, isMobileView, navbar, header) {
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
        addMask.classList.remove('slide-out');
        addMask.classList.remove('d-none');
        addMask.classList.add('slide-in');
        addMask.innerHTML = generateAddContactOverlay();
    }
}


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


function showEditContactOverlayHELP(i, editMask, editMobileBtn, contactInfoSliderMobile, contactInfoConMobile, infoSliderHeadline, contactList, addNewContactBtn, isMobileView) {
    addZindexContacts();
    if (isMobileView) {
        editMask.classList.remove('slide-in');
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
        editMask.classList.remove('slide-out');
        editMask.classList.remove('slide-in-mobile');
        editMask.classList.remove('slide-out-mobile');
        editMask.classList.remove('d-none');
        editMask.classList.add('slide-in');
        contactInfoConMobile.classList.add('z-index-minus-2');
    }
}


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


function closeAddContactSliderHELP(infoSlider, addMask, contactInfoConMobile, infoSliderHeadline, isMobileView, contactInfoSlider, darkBgr) {
    removeZindexContacts();
    if (isMobileView) {
        darkBgr.classList.add('hide-dark-bgr');
        darkBgr.classList.add('d-none');
        darkBgr.classList.remove('dark-bgr');
        addMask.classList.add('slide-out-mobile');
        addMask.classList.remove('slide-in')
        addMask.classList.remove('slide-in-mobile');
        contactInfoConMobile.classList.add('d-none');
        infoSliderHeadline.classList.remove('z-index-minus-1');
        addMask.classList.add('d-none');
    } else {
        addMask.classList.remove('slide-in-mobile');
        addMask.classList.remove('slide-in');
        addMask.classList.add('slide-out');
        addMask.classList.add('slide-in');
        addMask.classList.add('d-none');
    }
    hideAddContactSlider();
}


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


function timeoutEditSlider(editMask) {
    setTimeout(() => {
        editMask.classList.add('d-none');
        hideAddContactSlider();
    }, 250);
}


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
        editMask.classList.remove('slide-in');
        editMask.classList.add('slide-out');
        contactInfoConMobile.classList.remove('z-index-minus-2');
    }
}


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


function showContactInfoSlider(i) {
    let headline = document.getElementById('headline');
    let headlineMobile = document.getElementById('headlineMobile');
    let contactInfoSlider = document.getElementById('contactInfoSlider');
    let contactInfoConMobile = document.getElementById('contactInfoConMobile');
    contactInfoConMobile.classList.remove('d-none');
    let isMobileView = window.innerWidth < 1360;

    updateContactInfoSlider(i, headline, headlineMobile, contactInfoSlider, contactInfoConMobile, isMobileView);
}


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
    let addMask = document.getElementById('addMask');

    headlineMobile.classList.remove('z-index-2');
    addMask.classList.remove('slide-in');
    contactInfoConMobile.classList.remove('slide-in');
    contactInfoConMobile.classList.add('d-none');
    headlineMobile.classList.remove('z-index-1');
    headlineMobile.classList.add('d-none');
}


// window.addEventListener('resize', function () {
//     let headline = document.getElementById('headline');
//     let headlineMobile = document.getElementById('headlineMobile');
//     let contactInfoSlider = document.getElementById('contactInfoSlider');
//     let contactInfoConMobile = document.getElementById('contactInfoConMobile');
//     let isMobileView = window.innerWidth < 1360;
//     let isMobileViewIphone = window.innerWidth < 860;
//     let contactInfoSliderVisible = contactInfoSlider.classList.contains('show');

//     refreshInfoSliderOnScreenSize(headline, headlineMobile, contactInfoSlider, contactInfoConMobile, isMobileView, isMobileViewIphone, contactInfoSliderVisible);
// });


function refreshInfoSliderOnScreenSize(headline, headlineMobile, contactInfoSlider, contactInfoConMobile, isMobileView, isMobileViewIphone, contactInfoSliderVisible) {
    refreshMobileView(isMobileView, contactInfoSliderVisible, headline, headlineMobile);
    refreshMobileViewIphone(isMobileViewIphone, headlineMobile);
    refreshMobileViewIphoneAndIfVisible(contactInfoSliderVisible, isMobileViewIphone, headlineMobile, contactInfoSlider, contactInfoConMobile);
}


function refreshMobileView(isMobileView, contactInfoSliderVisible, headline, headlineMobile) {
    if (isMobileView && !contactInfoSliderVisible) {
        headline.classList.add('d-none');
        headlineMobile.classList.remove('d-none');
    } else {
        headline.classList.remove('d-none');
        headlineMobile.classList.add('d-none');
    }
}


function refreshMobileViewIphone(isMobileViewIphone, headlineMobile) {
    if (isMobileViewIphone) {
        headlineMobile.classList.add('z-index-2');
        headlineMobile.classList.remove('z-index-minus-2');
    } else {
        headlineMobile.classList.remove('z-index-minus-2');
    }
}


function refreshMobileViewIphoneAndIfVisible(contactInfoSliderVisible, isMobileViewIphone, headlineMobile, contactInfoSlider, contactInfoConMobile) {
    if (!contactInfoSliderVisible && isMobileViewIphone) {
        headlineMobile.classList.add('d-none');
        contactInfoSlider.classList.add('d-none');
        contactInfoConMobile.classList.add('d-none');
    }
}