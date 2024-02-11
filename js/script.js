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



async function deleteItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;

    return fetch(url, { method: 'DELETE' })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log(`Key "${key}" erfolgreich gelöscht.`);
            } else {
                throw `Fehler beim Löschen des Keys "${key}".`;
            }
        })
        .catch(error => console.error(`Fehler beim Löschen des Keys "${key}":`, error));
}