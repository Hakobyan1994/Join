const STORAGE_TOKEN = 'MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json())
}


async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


async function init() {
    includeHTML();
    renderSummaryMain();
    await loadContacts();
    await loadTasks();
    closeInfoList();
}


async function initLogin() {
    includeHTML();
    logoAnimation();
    validateCheckbox();
    loginSetTimeout();
    validatePassword();
}


function goBack() {
    window.history.back();
}


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


function resetMainPages() {
    let allPages = document.querySelectorAll('.render-page');
    allPages.forEach((page) => {
        page.innerHTML = '';
    })
}


function resetHlp() {
    let allPages = document.querySelectorAll('.hlp');
    document.getElementById('legalhover').style.color = 'rgb(205, 205, 205)';
    document.getElementById('privacyhover').style.color = 'rgb(205, 205, 205)';
    allPages.forEach((page) => {
        page.style.display = 'none';
    })
}


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


function styleHelp(content) {
    content.innerHTML = generateHtmlMainHelp();
    document.getElementById('legalhover').style.color = 'rgb(205, 205, 205)';
    document.getElementById('privacyhover').style.color = 'rgb(205, 205, 205)';
}


function stylePrivacy(content) {
    content.innerHTML = generateHtmlMainPrivacy();
    document.getElementById('privacyhover').style.color = 'var(--lightblue)';
    document.getElementById('info-list-privacy').style.color = 'var(--lightblue)';
    document.getElementById('info-list-legal').style.color = 'rgb(205, 205, 205)';
    document.getElementById('legalhover').style.color = 'rgb(205, 205, 205)';
}


function styleLegal(content) {
    content.innerHTML = generateHtmlMainLegal();
    document.getElementById('legalhover').style.color = 'var(--lightblue)';
    document.getElementById('info-list-legal').style.color = 'var(--lightblue)';
    document.getElementById('info-list-privacy').style.color = 'rgb(205, 205, 205)';
    document.getElementById('privacyhover').style.color = 'rgb(205, 205, 205)';
}


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


function closeInfoList() {
    document.addEventListener('click', function (event) {
        let clickInfoDiv = document.getElementById('clickInfoDiv');
        let shortName = document.getElementById('shortName');

        if (!clickInfoDiv.contains(event.target) && event.target !== shortName) {
            clickInfoDiv.style.display = 'none';
        }
    });
}


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


function logoutUser() {
    localStorage.clear();
    window.location.href = '../index.html';
    document.getElementById('shortName').innerHTML = '';
    nameActiveUser = [];
}


function addZindex() {
    document.getElementById('mobile-header').classList.add('z-12');
    document.getElementById('navbar').classList.add('z-11');
}


function removeZindex() {
    document.getElementById('mobile-header').classList.remove('z-12');
    document.getElementById('navbar').classList.remove('z-11');
}


function addZindex13() {
    document.getElementById('mobile-header').classList.add('z-13');
    document.getElementById('navbar').classList.add('z-12');
}


function removeZindex13() {
    document.getElementById('mobile-header').classList.remove('z-13');
    document.getElementById('navbar').classList.remove('z-12');
}


function addZindexContacts() {
    let navbar = document.getElementById('navbar');
    let header = document.getElementById('mobile-header');
    navbar.classList.add('z-index-minus-8');
    header.classList.add('z-index-minus-9');
}


function removeZindexContacts() {
    let navbar = document.getElementById('navbar');
    let header = document.getElementById('mobile-header');
    navbar.classList.remove('z-index-minus-8');
    header.classList.remove('z-index-minus-9');
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