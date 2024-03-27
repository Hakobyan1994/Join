function addRandomColorToImg(imageElement, contact) {
    if (imageElement) {
        applyRandomColorToImage(imageElement, contact);
    }
}


function onlyNumbers(evt) {
    let charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 37 && charCode !== 39) {
        return false;
    }

    return true;
}


function changeImage(hovered) {
    if (hovered) {
        document.getElementById('cancelBtnImg').src = '../assets/img/icons/close-blue1.svg';
    } else {
        document.getElementById('cancelBtnImg').src = '../assets/img/icons/close-black1.svg';
    }
}


function addHighlight(contactDiv) {
    contactDiv.classList.add('highlighted');
}


function removeHighlight(contactDiv) {
    contactDiv.classList.remove('highlighted');
}


function openMobileMenu(event) {
    event.stopPropagation();

    let menuMobileCon = document.getElementById('slideInMenuMobile');
    menuMobileCon.classList.remove('d-none');
}


function closeMobileMenu() {
    let menuMobileCon = document.getElementById('slideInMenuMobile');
    menuMobileCon.classList.add('d-none');
} 


function dontCloseCard(event) {
    event.stopPropagation();
}


function preventEventPropagation(event) {
    event.stopPropagation();
}


function clearInputs(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}