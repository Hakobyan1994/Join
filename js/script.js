const STORAGE_TOKEN = 'MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Sets an item in the remote storage.
 * 
 * @param {string} key - The key for the item.
 * @param {any} value - The value to be stored.
 * @returns {Promise<Object>} A promise representing the result of the operation.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json())
}


/**
 * Retrieves an item from the remote storage.
 * 
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<any>} A promise that resolves with the retrieved value.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


/**
 * Initializes the application.
 * Includes HTML content, renders the summary page, and loads contacts and tasks asynchronously.
 */
async function init() {
    includeHTML();
    renderSummaryMain();
    await loadContacts();
    await loadTaskss();
    closeInfoList();
}


/**
 * Initializes the login page.
 * Includes HTML content, animates the logo, validates form inputs, and sets timeouts for login functionality.
 */
async function initLogin() {
    logoAnimation();
    includeHTML();
    validateCheckbox();
    loginSetTimeout();
    validatePassword();
}


/**
 * Navigates the user back to the previous page.
 */
function goBack() {
    window.history.back();
}


/**
 * Loads tasks asynchronously.
 */

async function loadTasks() { 
    try {
        tasks = JSON.parse(await getItem('tasks')) || [];
        if (!Array.isArray(tasks)) {
            tasks = [];
        }
    } catch (e) {
        console.error('Error in loadTasks:', e);
    }
}


/**
 * Renders a specific page.
 * 
 * @param {string} selectedBar - The selected navbar item.
 * @param {string} page - The page to render.
 */
function renderPage(selectedBar, page) {
    renderHPLMain();
    resetMainPages();
    let selectedNavbar = document.getElementById(selectedBar);
    let selectedPage = document.getElementById(page);
    let allNavbar = document.querySelectorAll('#navbar');
    let allPages = document.querySelectorAll('.render-page');

    selectedNavbar.classList.add('selected-color');
    selectedPage.style.display = 'block';
    selectPage(page);
    highlightSelectedPage(page, selectedBar, allNavbar, allPages);
    resetHlp();
}


 function selectPage(page) {
    if (page === 'render-summary') {
        renderSummaryMain();
    }
    if (page === 'render-add-task') {
        renderAddTaskMain();
    }
    if (page === 'render-contacts') {
        renderContactsMain();
    }
    if (page === 'render-board') {
        loadTasks();
        renderBoardMain();
    }
}


/**
 * Highlights the selected page in the navbar.
 * 
 * @param {string} page - The page to highlight.
 * @param {string} selectedBar - The selected navbar item.
 * @param {NodeList} allNavbar - All navbar elements.
 * @param {NodeList} allPages - All page elements.
 */
function highlightSelectedPage(page, selectedBar, allNavbar, allPages) {
    allNavbar.forEach((navbar) => {
        if (navbar.id !== selectedBar) {
            navbar.classList.remove('selected-color');
        }
    })
    allPages.forEach((pages) => {
        if (pages.id !== page) {
            pages.style.display = 'none';
        }
    })
}


/**
 * Resets main pages content.
 */
function resetMainPages() {
    let allPages = document.querySelectorAll('.render-page');
    allPages.forEach((page) => {
        page.innerHTML = '';
    })
}


/**
 * Resets help pages content.
 */
function resetHlp() {
    let allPages = document.querySelectorAll('.hlp');
    document.getElementById('legalhover').style.color = 'rgb(205, 205, 205)';
    document.getElementById('privacyhover').style.color = 'rgb(205, 205, 205)';
    allPages.forEach((page) => {
        page.style.display = 'none';
    })
}


/**
 * Renders the Help, Privacy Policy, or Legal Notice page.
 * 
 * @param {string} page - The page to render.
 * @returns {string} The rendered page.
 */
function renderHPLMain(page) {
    let content = document.getElementById(page);
    let allHlp = document.querySelectorAll('.hlp');
    if (content) {
        content.style.display = 'block';
    }
    allHlp.forEach((pages) => {
        if (pages.id !== page) {
            pages.style.display = 'none';
        }
    })
    resetStyle();
    styleIf(page, content);
    document.getElementById('clickInfoDiv').style.display = 'none';
    return page;
}


/**
 * Resets the style of navbar and pages.
 */
function resetStyle() {
    let allNavbar = document.querySelectorAll('.navbar');
    let allPages = document.querySelectorAll('.render-page');
    document.getElementById('info-list-privacy').style.color = 'rgb(205, 205, 205)';
    document.getElementById('info-list-legal').style.color = 'rgb(205, 205, 205)';

    allNavbar.forEach((navbar) => {
        navbar.classList.remove('selected-color');
    })
    allPages.forEach((pages) => {
        pages.style.display = 'none';
    })
}


/**
 * Determines the styling function to be applied based on the provided page name.
 *
 * @param {string} page - The name of the page to determine styling for.
 * @param {HTMLElement} content - The content element to be styled.
 */
function styleIf(page, content) {
    if (page === 'render-help') {
        styleHelp(content);
    }
    if (page === 'render-privacy-policy') {
        stylePrivacy(content);
    }
    if (page === 'render-legal-notice') {
        styleLegal(content);
    }
}


/**
 * Styles the Help page.
 * 
 * @param {HTMLElement} content - The content container.
 */
function styleHelp(content) {
    content.innerHTML = generateHtmlMainHelp();
    document.getElementById('legalhover').style.color = 'rgb(205, 205, 205)';
    document.getElementById('privacyhover').style.color = 'rgb(205, 205, 205)';
}


/**
 * Styles the Privacy Policy page.
 * 
 * @param {HTMLElement} content - The content container.
 */
function stylePrivacy(content) {
    content.innerHTML = generateHtmlMainPrivacy();
    document.getElementById('privacyhover').style.color = 'var(--lightblue)';
    document.getElementById('info-list-privacy').style.color = 'var(--lightblue)';
    document.getElementById('info-list-legal').style.color = 'rgb(205, 205, 205)';
    document.getElementById('legalhover').style.color = 'rgb(205, 205, 205)';
}


/**
 * Styles the Legal Notice page.
 * 
 * @param {HTMLElement} content - The content container.
 */
function styleLegal(content) {
    content.innerHTML = generateHtmlMainLegal();
    document.getElementById('legalhover').style.color = 'var(--lightblue)';
    document.getElementById('info-list-legal').style.color = 'var(--lightblue)';
    document.getElementById('info-list-privacy').style.color = 'rgb(205, 205, 205)';
    document.getElementById('privacyhover').style.color = 'rgb(205, 205, 205)';
}


/**
 * Returns the current date in YYYY-MM-DD format.
 * 
 * @returns {string} The current date.
 */
function minDate() {
    let dateObj = new Date();
    let day = dateObj.getDate();
    day = day < 10 ? "0" + day : day;
    let month = dateObj.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let year = dateObj.getFullYear();

    let resultDate = `${year}-${month}-${day}`;

    return resultDate;
}


/**
 * Closes the info list dropdown.
 */
function closeInfoList() {
    document.addEventListener('click', function (event) {
        let clickInfoDiv = document.getElementById('clickInfoDiv');
        let shortName = document.getElementById('shortName');

        if (!clickInfoDiv.contains(event.target) && event.target !== shortName) {
            clickInfoDiv.style.display = 'none';
        }
    });
}


/**
 * Closes a dropdown list.
 * 
 * @param {string} id - The ID of the dropdown list.
 * @param {string} eId - The ID of the related input element.
 * @param {string} icon - The ID of the dropdown icon.
 */
function closeList(id, eId, icon) {
    let list = document.getElementById(id);
    let eIdElement = document.getElementById(eId);
    let assignedButton = document.getElementById('assigned-button');
    let dropdown = document.getElementById(icon);
    if (list) {
        document.addEventListener('click', function (event) {
            checkElementsOfCloseIt(list, eIdElement, assignedButton, dropdown, event, id);
        });
    }
}


/**
 * Checks if the clicked element is outside the specified list, input element, or dropdown icon.
 * If the clicked element is outside, hides the list and optionally resets the input element and button.
 * 
 * @param {HTMLElement} list - The dropdown list element.
 * @param {HTMLElement} eIdElement - The input element associated with the dropdown list.
 * @param {HTMLElement} assignedButton - The button to be reset (optional).
 * @param {HTMLElement} dropdown - The dropdown icon element.
 * @param {MouseEvent} event - The click event.
 * @param {string} id - The ID of the dropdown list.
 */
function checkElementsOfCloseIt(list, eIdElement, assignedButton, dropdown, event, id) {
    if (!list.contains(event.target) && event.target !== eIdElement && event.target !== dropdown) {
        list.classList.add('d-none');
        if (id === 'assigned-list') {
            eIdElement.value = '';
            eIdElement.placeholder = 'Select contacts to assign';
            if (assignedButton) {
                assignedButton.classList.remove('d-none');
            } else {
                console.log('ID: assigned-button not found');
            }
        }
    } else {
        list.classList.add('block');
    }
}


/**
 * Logs out the user and redirects to the login page.
 */
function logoutUser() {
    localStorage.clear();
    window.location.href = '../index.html';
    document.getElementById('shortName').innerHTML = '';
    nameActiveUser = [];
}


// function notSupported() {
//     if(window.innerWidth < 320) {
//         let body = document.body;
//         body.innerHTML = '';
//         body.innerHTML = 'Hallo';
//     } else if (window.innerWidth > 320) {
//         window.location.href = '../index.html';
//     }
// }

// window.addEventListener('resize', notSupported);