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
    let selectedNavbar = document.getElementById(selectedBar);
    let selectedPage = document.getElementById(page);
    let allNavbar = document.querySelectorAll('.navbar');
    let allPages = document.querySelectorAll('.render-page');
    document.getElementById('render-help').style.display = 'none';
    selectedNavbar.classList.add('selected-color');
    selectedPage.style.display = 'block';
    if (page === 'render-add-task') {
        renderAddTaskMain();
    }
    if(page === 'render-contacts') {
        renderContactsMain();
    }
    if(page === 'render-board') {
        renderBoardMain();
    }

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

function renderHPLMain(page) {
        let content = document.getElementById(page);
        let allNavbar = document.querySelectorAll('.navbar');
        let allPages = document.querySelectorAll('.render-page');
        if(content) {
            content.style.display = 'block';
        }
        console.log(allNavbar);


        allNavbar.forEach((navbar) => {
            navbar.classList.remove('selected-color');
        })
        allPages.forEach((pages) => {
            pages.style.display = 'none';
        })
        if(page === 'render-help') {
            content.innerHTML = generateHtmlMainHelp();
        }
        if(page === 'render-privacy-policy') {
            content.innerHTML = generateHtmlMainPrivacy();
        }
        return page;
}