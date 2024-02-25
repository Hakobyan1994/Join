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
    await loadContacts();
}

async function initSummary() {
    await includeHTML();
    // dateUpdate();
    // timer();
    await getValue();
    loadTasks();
    loadSelectedPage();
}

async function initAddTask() {
  
    await includeHTML();
    await renderAddTask();
    loadContacts();
}

async function initContacts() {
    await includeHTML();
    await loadContacts();
    renderContacts();
}

async function initBoard() {
    await includeHTML();
    await loadTasks();
    loadToDo();
}

function initIndex() {
    localStorage.setItem('selectedPage', 'summary');
    loadSelectedPage();
}

function forwardToPage(pageName, event) {
    let menus = document.querySelectorAll('.menubar a');
    menus.forEach(item => item.classList.remove('selected-color'));
  
    let active = document.getElementById(`${pageName}-page`);
    active.classList.add('selected-color');
    selectPage.push(pageName);
    localStorage.setItem('selectedPage', pageName);
}


async function loadSelectedPage() {
    let page = localStorage.getItem('selectedPage');
    let id = page.trim() + '-page';
    let div = document.getElementById(`${id}`);
    console.log(id);
    if(div) {
        div.classList.add('selected-color');
    } else {
        console.log('nicht gefunden');
        if (div && div.classList.contains('selected-color')) {
            div.classList.remove('selected-color');
        }
    }
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

