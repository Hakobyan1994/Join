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
    await includeHTML();
    await loadContacts();
}

async function initSummary() {
    await includeHTML();

}

async function initAddTask() {
    await includeHTML();
    renderAddTask();
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

function forwardToPage(page) {
    let allButtons = document.querySelectorAll('.menubar a');
    let clickedButton = document.getElementById(`${page}-page`);
    allButtons.forEach(button => {

        if (button.classList.contains('selected-color')) {
            button.classList.remove('selected-color');
        
        }
    });

    if (clickedButton) {
        clickedButton.classList.add('selected-color');
        localStorage.setItem('selectedPage', page);
        if (page === 'add-task') {
        renderAddTask();
      }
    }
}

function loadSelectedPage() {
    const selectedPage = localStorage.getItem('selectedPage');
    if (selectedPage) {
        forwardToPage(selectedPage);
    }
}

window.addEventListener('load', loadSelectedPage);