/**
 * Adds z-index to header and navbar elements.
 */
function addZindex() {
    document.getElementById('mobile-header').classList.add('z-12');
    document.getElementById('navbar').classList.add('z-11');
}


/**
 * Removes z-index from header and navbar elements.
 */
function removeZindex() {
    document.getElementById('mobile-header').classList.remove('z-12');
    document.getElementById('navbar').classList.remove('z-11');
}


/**
 * Adds z-index to header and navbar elements.
 */
function addZindex13() {
    document.getElementById('mobile-header').classList.add('z-13');
    document.getElementById('navbar').classList.add('z-12');
}


/**
 * Removes z-index from header and navbar elements.
 */
function removeZindex13() {
    document.getElementById('mobile-header').classList.remove('z-13');
    document.getElementById('navbar').classList.remove('z-12');
}


/**
 * Adds z-index to header and navbar elements.
 */
function addZindexContacts() {
    let navbar = document.getElementById('navbar');
    let header = document.getElementById('mobile-header');
    navbar.classList.add('z-index-minus-8');
    header.classList.add('z-index-minus-9');
}


/**
 * Removes z-index from header and navbar elements.
 */
function removeZindexContacts() {
    let navbar = document.getElementById('navbar');
    let header = document.getElementById('mobile-header');
    navbar.classList.remove('z-index-minus-8');
    header.classList.remove('z-index-minus-9');
}