// async function deleteItem(key) {
//     const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;

//     return fetch(url, { method: 'DELETE' })
//         .then(res => res.json())
//         .then(res => {
//             if (res.success) {
//                 console.log(`Key "${key}" erfolgreich gelöscht.`);
//             } else {
//                 throw `Fehler beim Löschen des Keys "${key}".`;
//             }
//         })
//         .catch(error => console.error(`Fehler beim Löschen des Keys "${key}":`, error));
// }


// async function saveTasks(newTask) {
//     setItem('tasksNew', tasks)
//         .then(response => {
//             console.log('Array erfolgreich auf dem Server gespeichert:', response);
//             localStorage.setItem('tasksNew', JSON.stringify(tasks));
//         })
//         .catch(error => console.error('Fehler beim Speichern des Arrays auf dem Server:', error));
// }


// async function loadTasks() {
//     getItem('tasksNew')
//         .then(array => {
//             console.log('Abgerufenes Array vom Server:', array);
//             tasks = array || [];
//             localStorage.setItem('taskNews', JSON.stringify(tasks));
//         })
//         .catch(error => console.error('Fehler beim Abrufen des Arrays vom Server:', error));

//     let taskLocal = localStorage.getItem('tasksNew');
//     tasks = taskLocal ? JSON.parse(taskLocal) : [];
// }


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

deleteItem('testaufgaben');