let selectPage = [];

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


/*
async function initSummary() {
    await includeHTML();
    // dateUpdate();
    // timer();
    await getValue();
    loadTasks();
}
*/


/*
async function initAddTask() {
  
    await includeHTML();
    await renderAddTask();
    loadContacts();
}
*/


// async function initContacts() {
//     await includeHTML();
//     await loadContacts();
//     renderContacts();
// }


async function initBoard() {
    await includeHTML();
    await loadTasks();
    loadToDo();
}


function forwardToPage(pageName, event) {
    let menus = document.querySelectorAll('.menubar a');
    menus.forEach(item => item.classList.remove('selected-color'));
  
    let active = document.getElementById(`${pageName}-page`);
    active.classList.add('selected-color');
    selectPage.push(pageName);
    localStorage.setItem('selectedPage', pageName);
}


function deleteLocalStorage() {
    localStorage.removeItem('selectedPage');
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
    let selectedNavbar = document.getElementById(selectedBar);
    let selectedPage = document.getElementById(page);
    let allNavbar = document.querySelectorAll('.navbar');
    let allPages = document.querySelectorAll('.render-page');
    console.log(allNavbar);
    selectedNavbar.classList.add('selected-color');
    selectedPage.style.display = 'block';
    if(page === 'render-add-task') {
        renderAddTaskMain();
    } else if (page === 'render-contacts') {
        renderContactsMain();
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


/* 
function clickSelection(bar, page) {
    let menu = document.getElementById(bar);
    let old = document.getElementById(page);
    let matches = document.querySelectorAll('.selection');
    console.log(matches);
    if(menu) {
        menu.classList.add('selected-color');
    }
}
*/